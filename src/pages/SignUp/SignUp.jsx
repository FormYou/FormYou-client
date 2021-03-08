import './SignUp.scss';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { api } from 'data/api.json';

const SignUp = () => {
    const [displayError, setDisplayError] = useState('');
    const { register, handleSubmit, watch, errors } = useForm();
    const history = useHistory();

    const signup = data => {
        fetch(`${api}signup`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({user: data})
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response)
            history.push("/");
        })
        .catch((error) => setDisplayError('Mauvais identifiant / password'));
    }

  return (
    <div className="SignUp">
        <h1 className="SignUp__title">S'enregistrer</h1>
        <form className="SignUp__form" onSubmit={handleSubmit(signup)}>
          <input className="SignUp__form__name" name="name" type="name" placeholder="name" ref={register({ required: true })} />
          <input className="SignUp__form__email" name="email" type="email" placeholder="email" ref={register({ required: true })} />
          <input className="SignUp__form__password" name="password" type="password" placeholder="password" ref={register({ required: true })} />
          <input className="SignUp__form__password" name="password_confirmation" type="password" placeholder="password_confirmation" ref={register({ required: true })} />
          <input className="SignUp__form__submit" type="submit" value="connection"/>
        </form>
    </div>
  );
};

export default SignUp;
