import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { api } from 'data/api.json';
import DeleteUser from 'components/DeleteUser';

const AllUsers = () => {
  const user = useSelector(state => state);
  const [users, setUsers] = useState('');

  const fetchUsers = () => {
    fetch(`${api}users`, {
      method: 'get',
      headers: {
        'Authorization': user.token,
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then((response) => {
        setUsers(response);
      }).catch((error) => `error : ${error}`)
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <h2>Tout les utilisateurs</h2>
      <ul className="User-list">
        {users && users.map((user) => (
          <li key={user.id}>
            <p><span>Nom : </span>{user.name}</p>
            <p><span>Email : </span> {user.email}</p>
            <p><span>Role : </span> {user.role}</p>
            <DeleteUser id={user.id} allUsers={fetchUsers} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default AllUsers;