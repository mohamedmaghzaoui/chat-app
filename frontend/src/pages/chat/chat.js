import { UsersList } from './userList';
import { Conversation } from './conversation/conversation';
import './chat.css';
import { useEffect, useState } from 'react';
import { getUser } from '../../services/userApi';
import { Tooltip } from 'react-tooltip';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import { HiOutlineUsers } from 'react-icons/hi2';
import { AiOutlineUser } from 'react-icons/ai';
import { Profile } from './profile';
export const Chat = () => {
  const [currentUser, setCurrentUser] = useState();
  const [conversationId, setConversationId] = useState();
  const [chatUser, setChatUser] = useState();
  const [currentSideElement, setCurrentSideElement] = useState('conversation');
  const getChatUser = (user) => {
    setChatUser(user);
  };
  const getConversationId = (id) => {
    setConversationId(id);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUser();
      setCurrentUser(data);
    };

    fetchUsers();
  }, []);
  console.log(currentUser);
  console.log(chatUser);
  let sideElement;
  if (currentSideElement == 'conversation') {
    sideElement = (
      <UsersList
        getConversationId={getConversationId}
        currentUser={currentUser}
        getChatUser={getChatUser}
      />
    );
  } else {
    sideElement = <Profile user={currentUser} />;
  }

  return (
    <div className="container-fluid chat-content ">
      <div className="vertical-icons mt-5 me-4 ms-2">
        <AiOutlineUser
          onClick={() => {
            setCurrentSideElement('profile');
          }}
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Profile"
          className="mt-5 icon"
          size={30}
        />
        <Tooltip id="my-tooltip" />

        <IoChatboxEllipsesOutline
          onClick={() => {
            setCurrentSideElement('conversation');
          }}
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Conversation"
          className="mt-5 icon "
          size={30}
        />
        <IoSettingsOutline
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Settings"
          className="mt-5 icon"
          size={30}
        />
        <HiOutlineUsers
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Groups"
          className="mt-5 icon"
          size={30}
        />
      </div>

      {sideElement}

      <Conversation
        conversationId={conversationId}
        currentUser={currentUser}
        chatUser={chatUser}
      />
    </div>
  );
};
