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
export const Chat = () => {
  const [currentUser, setCurrentUser] = useState();

  const [chatUser, setChatUser] = useState();

  const getChatUser = (user) => {
    setChatUser(user);
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

  return (
    <div className="container-fluid chat-content ">
      <div className="vertical-icons mt-5 me-4 ms-2">
        <AiOutlineUser
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Profile"
          className="mt-5 icon"
          size={30}
        />
        <Tooltip id="my-tooltip" />

        <IoChatboxEllipsesOutline
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Chat"
          className="mt-5 icon"
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
      <UsersList getChatUser={getChatUser} />

      <Conversation currentUser={currentUser} chatUser={chatUser} />
    </div>
  );
};
