import './conversation.css';
import { IoIosMore } from 'react-icons/io';
import { FaRegSmile } from 'react-icons/fa';
import { CiMicrophoneOn } from 'react-icons/ci';
import { IoSend } from 'react-icons/io5';
import { IoCallOutline } from 'react-icons/io5';
import { IoIosSearch } from 'react-icons/io';
import { IoVideocamOutline } from 'react-icons/io5';
import { IoMdInformationCircleOutline } from 'react-icons/io';
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

  const [loadingMessageId, setLoadingMessageId] = useState(null);
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
    try {
      const response = await deleteMessageEndpoint(messageId);
      console.log(response);
    } catch (err) {
      console.log(err);
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
        {messages.length > 0 ? (
          [...messages]
            .sort((a, b) => new Date(a.created_at) - new Date(b.created_at)) // Sort by created_at
            .map((msg) => (
              <div
                key={msg.id}
                className={`message ${
                  msg.user_id === currentUser.id ? 'sent' : 'received'
                }`}
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
                  <div class="dropdown">
                    {msg.user_id === currentUser.id && (
                      <IoMdMore
                        size={20}
                        class=" dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      ></IoMdMore>
                    )}

                    <ul className="dropdown-menu">
                      <li className="dropdown-item  d-flex justify-content-between align-items-center">
                        <span style={{ color: '#495057' }}>Modify</span>
                        <MdOutlineModeEditOutline
                          className="text-primary"
                          size={20}
                        />
                      </li>
                      <li
                        onClick={() => {
                          deleteMessage(msg.id);
                          fetchMessages();
                        }}
                        className="dropdown-item  d-flex justify-content-between align-items-center"
                      >
                        <span style={{ color: '#495057' }}>Delete</span>
                        <MdDeleteOutline className="text-danger" size={20} />
                      </li>
                    </ul>
                  </div>
                  <span
                    className={`${
                      msg.user_id === currentUser.id
                        ? 'btn btn-primary '
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
                </div>
              </div>
            ))
        ) : (
          <div>No messages yet</div>
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
