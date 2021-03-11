import './UpdateFormation.scss';
import { api } from 'data/api';
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';

const UpdateFormation = ({ getFormation, title, description, teacher }) => {
  const [formation, setFormation] = useState({title, description, user_id:""});
	const [teachers, setTeachers] = useState([]);
  const user = useSelector(state => state);
  const { id } = useParams();
  const history = useHistory();

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

  const updateFormation = (e) => {
      e.preventDefault();
      fetch(`${api}formations/${id}`, {
          method: 'put',
          headers: {
            'Authorization': user.token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formation)
        })
      .then((response) => getFormation())
      .catch((error) => console.log(error));
  }

  const deleteFormation = () => {
      fetch(`${api}formations/${id}`, {
          method: 'destroy',
          headers: {
            'Authorization': user.token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formation)
        })
      .then((response) => history.push("/formations"))
      .catch((error) => console.log(error));
  }

  const handleChange = (e) => {
    setFormation({
      ...formation,
      [e.target.name]:e.target.value
    })
  }

  return (
    <div className="UpdateFormation">
        <h2 className="UpdateFormation__title">Modifier la formation</h2>
        <form className="UpdateFormation__form" onSubmit={updateFormation}>
          <select className="UpdateFormation__form__select" name="user_id" onChange={handleChange}>
              <option value={teacher.id}>{teacher.name}</option>
            {teachers && teachers.map((teacher)=> (
              <option value={teacher.id} >{teacher.name}</option>
            ))}
          </select>
          <input className="UpdateFormation__form__name" name="title" value={formation.title} onChange={handleChange}/>
          <textarea className="UpdateFormation__form__name" name="description" value={formation.description} onChange={handleChange}/>
          <input className="UpdateFormation__form__submit" type="submit" value="modifier la formation"/>
          <button className="UpdateFormation__form__delete" onClick={deleteFormation}>Supprimer la formation</button>
        </form>
    </div>
  );
};

export default UpdateFormation;
