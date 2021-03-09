import React from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const name = useSelector(state => state.name);

  return (
    <nav className="Navbar">
        <div className="Navbar__left">
          <Link to="/">
          <p className="Navbar__left__title">YouForm</p>
          </Link>
        </div>
      <div className="Navbar__right">
        {name ? <p>{name}</p> : <Link to="/signin"><p>Connexion</p></Link>}
      </div>
    </nav>
  );
};

export default Navbar;
