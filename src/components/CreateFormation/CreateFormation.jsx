import './CreateFormation.scss';
import { api } from 'data/api';
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

const CreateFormation = ({ getFormations }) => {
  const [formation, setFormation] = useState({title:"", description:"", user_id:""});
	const [teachers, setTeachers] = useState([]);
  const user = useSelector(state => state);

	useEffect(() => {
    	getTeachers()
  	}, [])

	const getTeachers = () => {
	    fetch(`${api}users/teacher`, {
          method: 'get',
          headers: {
            'Authorization': user.token,
            'Content-Type': 'application/json',
          },
        })
	    .then((response) => response.json())
	    .then((response) => {
	      setTeachers(response)
	    })
	    .catch((error) => console.log(error));
	}

  const createFormation = (e) => {
      e.preventDefault();
      fetch(`${api}formations`, {
          method: 'post',
          headers: {
            'Authorization': user.token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formation)
        })
      .then((response) => getFormations())
      .catch((error) => console.log(error));
  }

  const handleChange = (e) => {
    setFormation({
      ...formation,
      [e.target.name]:e.target.value
    })
  }

  return (
    <div className="CreateFormation">
        <h2 className="CreateFormation__title">Nouvelle Formation</h2>

        <form className="CreateFormation__form" onSubmit={createFormation}>
          <select className="CreateFormation__form__select" name="user_id" onChange={handleChange}>
            {teachers && teachers.map((teacher)=> (
              <option value={teacher.id} >{teacher.name}</option>
            ))}
          </select>
          <input className="CreateFormation__form__name" name="title" placeholder="titre" onChange={handleChange}/>
          <textarea className="CreateFormation__form__name" name="description" placeholder="description (min 20 caractères)" onChange={handleChange}/>
          <input className="CreateFormation__form__submit" type="submit" value="créer nouvelle formation"/>
        </form>
    </div>
  );
};

export default CreateFormation;
