import './Formations.scss';
import { api } from 'data/api';
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

import CreateFormation from 'components/CreateFormation/CreateFormation';
import CardFormation from 'components/CardFormation';

const Formations = () => {
	const [formations, setFormations] = useState([]);
  const user = useSelector(state => state);

	useEffect(() => {
    getFormations()
  }, [])

	const getFormations = () => {
        fetch(`${api}formations`, {
          method: 'get'
        })
        .then((response) => response.json())
        .then((response) => {
          setFormations(response)
        })
        .catch((error) => console.log(error));
  }
  
  return (
    <div className="Formations">
        <h1 className="Formations__title">Découvrez nos formations</h1>
        {user.role === "admin" ? <CreateFormation getFormations={getFormations}/> : ''}
        <ul className="Formations__list">{formations !== [] && formations.map((formation) => (
          <li className="Formations__list__item" key={formation.id}>
            {formation && <CardFormation formation={formation} link={`/formation/${formation.id}`}/>}
          </li>
        ))}
        </ul>
    </div>
  );
};

export default Formations;
