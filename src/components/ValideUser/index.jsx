import React from 'react';
import { api } from 'data/api.json';
import { useSelector } from 'react-redux';

const ValideUser = ({ id, notChecked }) => {
  const user = useSelector(state => state);

  const handleCheck = () => {
    fetch(`${api}users/${id}`, {
      method: 'put',
      headers: {
        'Authorization': user.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user: {checked: true}})
    })
    .then((response) => {
      notChecked();   
    })
  }

  return (
    <button className="btn-primary" type="button" onClick={handleCheck} >Valider l'utilisateur</button>
  );
};

export default ValideUser;