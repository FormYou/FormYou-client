import './SignIn.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from 'store/User/userAction';
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { api } from 'data/api.json';
import { Link } from 'react-router-dom';
import Form from "components/Form/Form";
import Input from "components/Input/Input";

const SignIn = () => {
  const dispatch = useDispatch();
  const [displayError, setDisplayError] = useState('');
  const { register, handleSubmit, watch, errors } = useForm();
  const history = useHistory();

    const signin = data => {
      let userToken = "";
        fetch(`${api}login`, {
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
          console.log(response);
          dispatch(setUser(response.data.attributes.name, 
                          response.data.attributes.role, 
                          response.data.attributes.checked,
                          userToken));
          history.push("/");
        })
        .catch((error) => setDisplayError('Mauvais identifiant / password'));
    }

  return (
    <div className="SignIn">
        <h1 className="SignIn__title">Se connecter</h1>
        <Form className="SignIn__form" onSubmit={signin}>
          <Input className="SignIn__form__email" name="email" placeholder="email" />
          <Input className="SignIn__form__password" type="password" name="password" placeholder="mot de passe" />
          <Input className="SignIn__form__submit" type="submit" value="connexion" />
        </Form>
        <Link to="/signup">
         <p className="Navbar__right__subscribe">S'enregistrer</p>
        </Link>
    </div>
  );
};

export default SignIn;
