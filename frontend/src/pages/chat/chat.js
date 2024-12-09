import { UsersList } from './userList';
import { Conversation } from './conversation/conversation';
import './chat.css';
import { useContext, useEffect, useState } from 'react';
import { getUser } from '../../services/userApi';
import { Tooltip } from 'react-tooltip';
import { IoSettingsOutline } from 'react-icons/io5';
import { IoChatboxEllipsesOutline } from 'react-icons/io5';
import { HiOutlineUsers } from 'react-icons/hi2';
import { AiOutlineUser } from 'react-icons/ai';
import { Setting } from './setting';
import { Profile } from './profile';
import { UserContext } from '../../Contexts/userContext';
export const Chat = () => {
  const { userData } = useContext(UserContext);
  const [conversationId, setConversationId] = useState();
  const [chatUser, setChatUser] = useState();
  const [currentSideElement, setCurrentSideElement] = useState('conversation');
  const getChatUser = (user) => {
    setChatUser(user);
  };
  const getConversationId = (id) => {
    setConversationId(id);
  };

  console.log(userData);
  console.log(chatUser);
  let sideElement;
  if (currentSideElement == 'conversation') {
    sideElement = (
      <UsersList
        getConversationId={getConversationId}
        currentUser={userData}
        getChatUser={getChatUser}
      />
    );
  } else if (currentSideElement == 'profile') {
    sideElement = <Profile user={userData} />;
  } else {
    sideElement = <Setting user={userData} />;
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
          onClick={() => {
            setCurrentSideElement('setting');
          }}
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
        currentUser={userData}
        chatUser={chatUser}
      />
    </div>
  );
};
