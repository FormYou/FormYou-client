import React from 'react';
import { useSelector } from 'react-redux';
import { api } from 'data/api';

const DeleteUser = ({ id, allUsers }) => {
  const token = useSelector(state => state.token);

  const deleteUser = () => {
    fetch(`${api}users/${id}`, {
      method: 'delete',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    }).then((response) => allUsers())
      .catch((error) => `error : ${error}`)
  }

  return (
    <div>
      <button className="btn-primary" onClick={deleteUser}>Supprimer</button>
    </div>
  );
};

export default DeleteUser;