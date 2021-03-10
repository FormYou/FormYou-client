import './Formations.scss';
import { api } from 'data/api';
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

import CreateFormation from 'components/CreateFormation/CreateFormation';

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
        {user.role === "admin" ? <CreateFormation getFormations={getFormations}/> : <p>not an admin</p>}
        <h2 className="Formations__listTitle">Liste des formations</h2>
        <ul>{formations !== [] && formations.map((formation) => (
          <li>{formation.title}</li>
        ))}
        </ul>
    </div>
  );
};

export default Formations;
