import './SignUp.scss';
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setName } from 'store/User/userAction';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { api } from 'data/api.json';
import Form from "components/Form/Form";
import Select from "components/Select/Select";
import Input from "components/Input/Input";

const SignUp = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const signup = data => {
      let userToken = "";
        fetch(`${api}signup`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({user: data})
        })
        .then((response) => {
          userToken = response.headers.get('Authorization');
          return response.json()
        })
        .then((response) => {
          dispatch(setUser(response.data.attributes.name, response.data.attributes.role, userToken));
          history.push("/");
        })
        .catch((error) => console.log(error));
    }

  return (
    <div className="SignUp">
        <h1 className="SignUp__title">S'enregistrer</h1>
        <Form className="SignIn__form" onSubmit={signup}>
          <Select className="SignUp__form__select" name="role" options={["étudiant", "professeur", "admin"]} />
          <Input className="SignUp__form__name" name="name" placeholder="nom" />
          <Input className="SignUp__form__email" name="email" type="email" placeholder="email" />
          <Input className="SignUp__form__password" name="password" type="password" placeholder="mot de passe" />
          <Input className="SignUp__form__password" name="password" type="password" placeholder="confirmation de mdp" />
          <Input className="SignUp__form__submit" type="submit" value="connexion" />
        </Form>
    </div>
  );
};

export default SignUp;
