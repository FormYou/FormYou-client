import React from 'react';
import './Navbar.scss';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from 'store/User/userAction';
import { api } from 'data/api.json';

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state);

  const logout = () => {
    fetch(`${api}logout`, {
      method: 'delete',
      headers: {
        'Authorization': user.token,
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      dispatch(setLogout());
      history.push('/');
    })
  }

  return (
    <nav className="Navbar">
        <div className="Navbar__left">
          <Link to="/">
            <p className="Navbar__left__title">YouForm</p>
          </Link>
          {user.role === 'admin' && (
            <Link to="/users">Validations utilisateurs</Link>
          )}
        </div>
      <div className="Navbar__right">
        {user.token && (
          <>
            <p>{user.name}</p>
            <button type="button" onClick={logout}>Se deconnecter</button>
          </>
         )}
        {!user.token && (
          <Link to="/signin">Connexion</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
