import './CreateFormation.scss';
import { api } from 'data/api';
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import GetCategories from 'components/GetCategories';

const CreateFormation = ({ getFormations }) => {
  const [teachers, setTeachers] = useState();
  const [formation, setFormation] = useState({title:"", description:"", user_id: "", category_id: []});
  const user = useSelector(state => state);
  const inputRef = useRef(null);

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
        console.log(response)
        setFormation({...formation, user_id: response[0].id})
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

  useEffect(() => {
    console.log(formation)
  }, [formation])

  return (
    <div className="CreateFormation">
        <h2 className="CreateFormation__title">Nouvelle Formation</h2>
        <form className="CreateFormation__form" onSubmit={createFormation}>
          <select className="CreateFormation__form__select" name="user_id" onChange={handleChange}>
              <option >Choix du professeur</option>
            {teachers && teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
            ))}
          </select>
          <input className="CreateFormation__form__name" name="title" placeholder="titre" onChange={handleChange}/>
          <textarea className="CreateFormation__form__description" name="description" placeholder="description (min 20 caractères)" onChange={handleChange}/>
          <GetCategories className="CreateFormation__form__getcategories" handleChange={handleChange} setFormation={setFormation} formation={formation} />
          <input className="CreateFormation__form__submit" type="submit" value="créer nouvelle formation"/>
        </form>
    </div>
  );
};

export default CreateFormation;
