import './SignIn.scss';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { api } from 'data/api.json';
import { Link } from 'react-router-dom';
import Form from "components/Form/Form";
import Input from "components/Input/Input";

const SignIn = () => {
    const [displayError, setDisplayError] = useState('');
    const { register, handleSubmit, watch, errors } = useForm();
    const history = useHistory();

    const signin = data => {
        fetch(`${api}login`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({user: data})
        })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            history.push("/");
        })
        .catch((error) => setDisplayError('Mauvais identifiant / password'));
    }

  return (
    <div className="SignIn">
        <h1 className="SignIn__title">Se connecter</h1>
        <Form className="SignIn__form" onSubmit={signin}>
          <Input className="SignIn__form__email" name="email" placeholder="email" />
          <Input className="SignIn__form__password" name="password" placeholder="mot de passe" />
          <Input className="SignIn__form__submit" type="submit" value="connexion" />
        </Form>
        <Link to="/signup">
         <p className="Navbar__right__subscribe">S'enregistrer</p>
        </Link>
    </div>
  );
};

export default SignIn;
