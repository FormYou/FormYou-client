import './Formation.scss';
import { useParams } from "react-router-dom";
import { api } from 'data/api';
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import SessionList from 'components/SessionList';
import CreateSession from 'components/CreateSession';

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
      setFormation(response)
    })
    .catch((error) => console.log(error));
  }

  return (
    <div className="Formation">
      <div className="Formation__update">
        {user.role == 'admin' ? formation && <UpdateFormation key={formation.id} getFormation={getFormation} title={formation.title} description={formation.description} teacher={formation.user}/> : ''}
      </div>
      <div className="Formation__head">
        <h1 className="Formation__head__title">{formation && formation.title}</h1>
        <h2 className="Formation__head__description">{formation && formation.description}</h2>
        <p className="Formation__head__teacher">professeur: {formation && formation.user.name}</p>
      </div>
      {user.role == 'admin' ? <CreateSession /> : ''}
      <div className="Formation__sessions">
        <h2 className="Formation__sessions__title">Sessions à venir</h2>
        {formation && <SessionList formation_id={formation.id} />}
      </div>
    </div>
  );
};

export default Formation;
