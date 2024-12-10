import './conversation.css';
import { IoIosMore } from 'react-icons/io';
import { FaRegSmile } from 'react-icons/fa';
import { CiMicrophoneOn } from 'react-icons/ci';
import { IoSend } from 'react-icons/io5';
import { IoCallOutline } from 'react-icons/io5';
import { IoIosSearch } from 'react-icons/io';
import { IoVideocamOutline } from 'react-icons/io5';
import { updateMessageEndpoint } from '../../../services/chatApi';
import { IoMdInformationCircleOutline } from 'react-icons/io';

import { IoCloseSharp } from 'react-icons/io5';
import { IoMdMore } from 'react-icons/io';

import {
  deleteMessage,
  deleteMessageEndpoint,
} from '../../../services/chatApi';
import { useEffect, useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { sendMessage, getMessages } from '../../../services/chatApi';

export const Conversation = ({ chatUser, currentUser, conversationId }) => {
  const [messageContent, setMessageContent] = useState('');
  const [messages, setMessages] = useState([]);
  const [editingMessage, setEditingMessage] = useState(null); // To track the message being edited
  const [newContent, setNewContent] = useState(''); // To store the new message content
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false); // Loading state for the update

  const [isLoadingDelete, setIsLoadingDelete] = useState(null);
  const handleEditMessage = (msg) => {
    setEditingMessage(msg);
    setNewContent(msg.content); // Pre-fill the input with the current message content
  };

  const handleUpdateMessage = async () => {
    if (!newContent.trim()) return; // Prevent updating with empty content
    try {
      setIsLoadingUpdate(true);
      console.log(newContent);
      await updateMessageEndpoint(editingMessage.id, newContent);

      fetchMessages(); // Refresh messages
      setEditingMessage(null); // Reset editing mode
    } catch (err) {
      console.error('Failed to update message:', err);
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  // Function to handle sending messages
  const handleSendMessage = async () => {
    if (!messageContent.trim()) return; // Prevent sending empty messages
    try {
      await sendMessage(messageContent, conversationId);
      setMessageContent(''); // Clear input field
      fetchMessages(); // Refresh messages
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleCloseEdit = () => {
    setEditingMessage(null); // Close the edit form without updating
  };

  // Function to fetch messages
  const fetchMessages = async () => {
    try {
      const fetchedMessages = await getMessages(conversationId);
      setMessages(fetchedMessages);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };
  const deleteMessage = async (messageId) => {
    setIsLoadingDelete(false);
    try {
      setIsLoadingDelete(true);
      const response = await deleteMessageEndpoint(messageId);
      fetchMessages();
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoadingDelete(false);
    }
  };

  // Fetch messages when the conversationId changes
  useEffect(() => {
    if (conversationId) {
      fetchMessages(); // Initial fetch for messages

      // Set an interval to fetch new messages every 2 seconds
      const interval = setInterval(() => {
        fetchMessages();
      }, 3000); // 2000 milliseconds = 2 seconds

      // Clean up interval on component unmount or when conversation changes
      return () => clearInterval(interval);
    }
  }, [conversationId]);

  if (!chatUser) {
    return <div></div>;
  }

  return (
    <div className="container-fluid my-3">
      {/* Header */}
      <div className="d-flex align-items-center" style={{ gap: '10px' }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#E3E1FC',
            color: '#7269ef',
            fontSize: '14px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {`${chatUser.first_name[0]}${chatUser.last_name[0]}`.toUpperCase()}
        </div>
        <h5 style={{ margin: 0, lineHeight: '1.2' }}>
          {chatUser.first_name} {chatUser.last_name}
        </h5>
        <div className="offset-xl-7 d-flex">
          <IoIosSearch className="me-4 ms-5 icon" size={25} />
          <IoCallOutline className="me-4 icon" size={25} />
          <IoVideocamOutline className="me-4 icon" size={25} />
          <IoMdInformationCircleOutline className="me-4 icon" size={25} />
          <IoMdMore size={25} className="icon" />
        </div>
      </div>

      <hr />
      {/* Messages Section */}
      <div className="messages mb-5">
        {isLoadingDelete || isLoadingUpdate ? (
          <div
            className="spinner-wrapper d-flex justify-content-center align-items-center"
            style={{ height: '100px' }} // Adjust height as needed
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : messages.length > 0 ? (
          [...messages]
            .sort((a, b) => new Date(a.created_at) - new Date(b.created_at)) // Sort by created_at
            .map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.user_id === currentUser.id ? 'sent' : 'received'}`}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent:
                      msg.user_id === currentUser.id
                        ? 'flex-end'
                        : 'flex-start',
                  }}
                >
                  <div className="dropdown">
                    {msg.user_id === currentUser.id && (
                      <IoMdMore
                        size={20}
                        className="dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      />
                    )}
                    <ul className="dropdown-menu">
                      <li
                        onClick={() => handleEditMessage(msg)}
                        className="dropdown-item d-flex justify-content-between align-items-center"
                      >
                        <span style={{ color: '#495057' }}>Modify</span>
                        <MdOutlineModeEditOutline
                          className="text-primary"
                          size={20}
                        />
                      </li>
                      <li
                        onClick={() => {
                          deleteMessage(msg.id);
                        }}
                        className="dropdown-item d-flex justify-content-between align-items-center"
                      >
                        <span style={{ color: '#495057' }}>Delete</span>
                        <MdDeleteOutline className="text-danger" size={20} />
                      </li>
                    </ul>
                  </div>

                  {/* Show editing form if the message is being edited */}
                  {editingMessage && editingMessage.id === msg.id ? (
                    <div className="edit-form">
                      <textarea
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        className="form-control"
                        rows={1}
                      />
                      <div className="d-flex justify-content-between">
                        <button
                          onClick={handleCloseEdit}
                          className="btn btn-danger btn-floating"
                        >
                          <IoCloseSharp />
                        </button>
                        <button
                          onClick={handleUpdateMessage}
                          className="btn btn-primary btn-floating"
                          disabled={isLoadingUpdate}
                        >
                          {isLoadingUpdate ? (
                            <span className="spinner-border spinner-border-sm" />
                          ) : (
                            <i class="fas fa-magic"></i>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <span
                      className={`${
                        msg.user_id === currentUser.id
                          ? 'btn btn-primary'
                          : 'btn btn-secondary'
                      } my-2`}
                      style={{
                        textAlign: 'left',
                        display: 'block',
                        width: 'fit-content',
                      }}
                    >
                      {msg.content}
                      <br />
                      <span
                        style={{
                          fontSize: '0.8em',
                          color:
                            msg.user_id === currentUser.id ? '#e0e0e0' : 'grey',
                        }}
                      >
                        {msg.created_at.slice(11, 16)}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            ))
        ) : (
          <p>No messages yet</p>
        )}
      </div>

      {/* Send Form */}
      <div className="send-form d-flex my-3">
        <IoIosMore className="me-3 icon" size={30} />
        <FaRegSmile className="me-3 icon" size={25} />
        <input
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Enter your message"
          type="text"
          className="form-control"
        />
        <CiMicrophoneOn size={35} className="mx-3 icon" />
        <button
          onClick={handleSendMessage}
          type="button"
          className="btn btn-primary"
        >
          <IoSend size={20} className="icon" />
        </button>
      </div>
    </div>
  );
};
