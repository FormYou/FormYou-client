import './CreateSession.scss';
import { api } from 'data/api';
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import GetCategories from 'components/GetCategories';

const CreateSession = () => {
  const [teachers, setTeachers] = useState();
  const [formation, setFormation] = useState({title:"", description:"", user_id: "", category_id: []});
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
        setFormation({...formation, user_id: response[0].id})
	    })
	    .catch((error) => console.log(error));
	}

  const createSession = (e) => {
      e.preventDefault();
      fetch(`${api}formations`, {
          method: 'post',
          headers: {
            'Authorization': user.token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formation)
        })
      .then((response) => {
        setFormation({...formation, title: "", description: ""})
      })
      .catch((error) => console.log(error));
  }

  const handleChange = (e) => {
    if (e.target.name === "category_id") {
      setFormation({
        ...formation,
        [e.target.name]: [...formation.category_id, e.target.value]
      })
    } else {
      setFormation({
        ...formation,
        [e.target.name]: e.target.value
      })
    }
  }

  return (
    <div className="CreateSession">
      <h2 className="CreateSession__title">Nouvelle Session</h2>
      <form className="CreateSession__form" onSubmit={createSession}>
        <select className="CreateSession__form__select" name="user_id" onChange={handleChange}>
          {teachers && teachers.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
          ))}
        </select>
        <input className="CreateSession__form__name" name="title" value={formation.title} placeholder="titre" onChange={handleChange}/>
        <textarea className="CreateSession__form__description" value={formation.description} name="description" placeholder="description (min 20 caractères)" onChange={handleChange}/>
        <GetCategories className="CreateSession__form__getcategories" handleChange={handleChange} setFormation={setFormation} formation={formation} />
        <input className="CreateSession__form__submit" type="submit" value="créer nouvelle formation"/>
      </form>
    </div>
  );
};

export default CreateSession;
