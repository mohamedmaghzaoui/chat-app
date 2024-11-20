import React, { useEffect, useState } from 'react';
import { getUsers } from '../../services/userApi';
import './chat.css';

export const UsersList = ({ getChatUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-list col-xl-3 ">
      <h2>Chats</h2>
      <ul>
        <h4>Users</h4>
        <input
          placeholder="Search for user"
          className="form-control mb-5 w-75"
          type="text"
        />
        {users && users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.id} // Always use `key` in the parent-most mapped element
              className="row d-flex align-items-center mb-4 user-left "
              onClick={() => getChatUser(user)}
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
          ))
        ) : (
          <div>No users</div>
        )}
      </ul>
    </div>
  );
};
