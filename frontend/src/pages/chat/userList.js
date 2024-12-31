import React, { useEffect, useState } from 'react';
import { getUsers } from '../../services/userApi';

import './chat.css';
import { addConversation } from '../../services/chatApi';

export const UsersList = ({ getChatUser, currentUser, getConversationId }) => {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const createConversation = async (chatUserId) => {
    try {
      const response = await addConversation(chatUserId);

      getConversationId(response.conversation_id);
    } catch (err) {
      console.error('Error creating conversation:', err);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };

    fetchUsers();
  }, []);
  let filteredUsers = '';
  if (users) {
    filteredUsers = users.filter((item) =>
      item.first_name.toLowerCase().includes(searchInput.toLowerCase())
    );
  }

  console.log(filteredUsers);

  return (
    <div className="side-element col-xl-3 col-3 ">
      <h2 className="mt-4 mx-3">Users</h2>
      <ul>
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for user"
          className="form-control mb-5 w-75"
          type="text"
        />
        {currentUser && filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers.map((user) =>
            user.id != currentUser.id ? (
              <div
                key={user.id} // Always use `key` in the parent-most mapped element
                className="row d-flex align-items-center mb-4 user-left "
                onClick={() => {
                  getChatUser(user);
                  createConversation(user.id);
                }}
              >
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: '#E3E1FC',
                    color: '#7269ef',
                    fontSize: '14px',
                    fontWeight: 'bold',
                  }}
                  className="d-flex align-items-center justify-content-center "
                >
                  {`${user.first_name[0]}${user.last_name[0]}`.toUpperCase()}
                </div>
                <div className="col">
                  <span>{user.first_name}</span>
                </div>
              </div>
            ) : null
          )
        ) : (
          <div>No users</div>
        )}
      </ul>
    </div>
  );
};
