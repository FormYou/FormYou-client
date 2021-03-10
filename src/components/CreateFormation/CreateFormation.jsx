import './CreateFormation.scss';
import { api } from 'data/api';
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

import Form from "components/Form/Form";
import Select from "components/Select/Select";
import Input from "components/Input/Input";

const CreateFormation = () => {
	const [teachers, setTeachers] = useState([]);
	const [displayError, setDisplayError] = useState('');
  const user = useSelector(state => state);

	useEffect(() => {
    	getTeachers()
  	}, [])

	const getTeachers = () => {
	    fetch(`${api}users`, {
          method: 'get',
          headers: {
            'Authorization': user.token,
            'Content-Type': 'application/json',
          },
        })
	    .then((response) => response.json())
	    .then((response) => {
	      // console.log(response)
	    })
	    .catch((error) => setDisplayError('Mauvais identifiant / password'));
	}

  return (
    <div className="CreateFormation">
        <h2 className="CreateFormation__title">Nouvelle Formation</h2>
        <Form className="CreateFormation__form" >
          <Select className="CreateFormation__form__select" name="user_id" options={['nimp', 'nimp2']} />
          <Input className="CreateFormation__form__name" name="title" placeholder="titre" />
          <Input className="CreateFormation__form__name" name="description" placeholder="description" />
          <Input className="CreateFormation__form__submit" type="submit" value="créer nouvelle formation" />
        </Form>
    </div>
  );
};

export default CreateFormation;
