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
import { useEffect, useState } from 'react';
import { sendMessage, getMessages } from '../../../services/chatApi';

export const Conversation = ({ chatUser, currentUser, conversationId }) => {
  const [messageContent, setMessageContent] = useState('');
  const [messages, setMessages] = useState([]);

  // Fetch messages when the conversationId changes
  useEffect(() => {
    if (conversationId) {
      fetchMessages();
    }
  }, [conversationId]);

  // Function to fetch messages
  const fetchMessages = async () => {
    try {
      const fetchedMessages = await getMessages(conversationId);
      setMessages(fetchedMessages);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
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
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          maxHeight: '60vh', // Adjust based on your layout
          marginBottom: '60px', // Ensure no overlap with the send form
        }}
      >
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`message ${
                msg.sender_id === currentUser.id ? 'sent' : 'received'
              }`}
              style={{
                textAlign: msg.sender_id === currentUser.id ? 'right' : 'left',
                margin: '10px 0',
              }}
            >
              <span>{msg.content}</span>
            </div>
          ))
        ) : (
          <div>No messages yet</div>
        )}
      </div>

      {/* Send Form */}
      <div className="send-form d-flex">
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
          className="btn btn-success"
        >
          <IoSend size={20} className="icon" />
        </button>
      </div>
    </div>
  );
};
