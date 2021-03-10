import './Formation.scss';
import { useParams } from "react-router-dom";
import { api } from 'data/api';
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

import UpdateFormation from 'components/UpdateFormation';

const Formation = () => {
  const { id } = useParams();
  const [formation, setFormation] = useState();
  const user = useSelector(state => state);

  useEffect(() => {
    	getFormation()
  }, [])

  const getFormation = () => {
    fetch(`${api}formations/${id}`, {
      method: 'get',
      headers: {
        'Authorization': user.token,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      setFormation(response)
    })
    .catch((error) => console.log(error));
  }

  return (
    <div className="Formation">
      {user.role == 'admin' ? formation && <UpdateFormation getFormation={getFormation} title={formation.title} description={formation.description} teacher={formation.user}/> : ''}
      <h1>{formation && formation.title}</h1>
      <p>{formation && formation.description}</p>
      <p>professeur: {formation && formation.user.name}</p>
    </div>
  );
};

export default Formation;
