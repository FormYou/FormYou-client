import './SignIn.scss';
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const SignIn = () => {
    const [displayError, setDisplayError] = useState('');
    const { register, handleSubmit, watch, errors } = useForm();

    const signin = data => {
        fetch(`http://127.0.0.1:3000/api/login`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            // history.push("/");
        })
        .catch((error) => setDisplayError('Mauvais identifiant / password'));
    }

  return (
    <div className="SignIn">
        <h1 className="SignIn__title">Se connecter</h1>
        <form className="SignIn__form" onSubmit={handleSubmit(signin)}>
          <input className="SignIn__form__email" name="email" type="email" placeholder="email" ref={register({ required: true })} />
          <input className="SignIn__form__password" name="password" type="password" placeholder="password" ref={register({ required: true })} />
          <input className="SignIn__form__submit" type="submit" value="connection"/>
        </form>
    </div>
  );
};

export default SignIn;
