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
export const Conversation = ({ chatUser, currentUser }) => {
  if (!chatUser) {
    return <div></div>;
  }

  return (
    <div className="container-fluid my-3">
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
      {/* You can add more details from chatUser here */}
      <div className="send-form ">
        <IoIosMore className="me-3 icon" size={30} />
        <FaRegSmile className="me-3 icon" size={25} />

        <input
          placeholder="Enter your message"
          type="text"
          className="form-control"
        />
        <CiMicrophoneOn size={35} className="mx-3 icon" />

        <button type="button" className="btn btn-success  ">
          <IoSend size={20} className="icon" />
        </button>
      </div>
    </div>
  );
};
