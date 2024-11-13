import React, { useEffect, useState } from 'react';
import { getUsers } from '../../services/userApi';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users && users.length > 0 ? (
          users.map((user) => <li key={user.id}>{user.first_name}</li>)
        ) : (
          <div>No users</div>
        )}
      </ul>
    </div>
  );
};

export default UsersList;
