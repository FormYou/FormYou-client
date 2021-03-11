import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { api } from 'data/api.json';
import './index.scss';
import ValideUser from 'components/ValideUser';
import AllUsers from 'components/AllUsers';
import DeleteUser from 'components/DeleteUser';

const Users = () => {
  const token = useSelector(state => state.token);
  const [notCheckedUsers, setNotCheckedUsers] = useState('');

  const notChecked = () => {
    fetch(`${api}users/checked`, {
      method: 'get',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then((response) => {
        setNotCheckedUsers(response);
      }).catch((error) => `error : ${error}`)
  }

  useEffect(() => {
    notChecked();
  }, []);

  return (
    <>
      <h2>Les Utilisateurs non validé :</h2>
      <ul className="User-list">
        {notCheckedUsers && notCheckedUsers.map((user) => (
          <li key={user.id}>
            <p><span>Nom : </span>{user.name}</p>
            <p><span>Email : </span> {user.email}</p>
            <p><span>Role : </span> {user.role}</p>
            <ValideUser id={user.id} notChecked={notChecked} />
            <DeleteUser id={user.id} allUsers={notChecked} />
          </li>
        ))}
      </ul>
      <AllUsers />
    </>
  );
};

export default Users;