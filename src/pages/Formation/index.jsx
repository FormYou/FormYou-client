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
      <div className="Formation__update">
        {user.role == 'admin' ? formation && <UpdateFormation getFormation={getFormation} title={formation.title} description={formation.description} teacher={formation.user}/> : ''}
      </div>
      <h1 className="Formation__title">{formation && formation.title}</h1>
      <p className="Formation__description">{formation && formation.description}</p>
      <p className="Formation__teacher">professeur: {formation && formation.user.name}</p>
    </div>
  );
};

export default Formation;
