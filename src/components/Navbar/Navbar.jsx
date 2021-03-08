import './Navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <nav className="Navbar">
        <div className="Navbar__left">
          <Link to="/">
          <p className="Navbar__left__title">YouForm</p>
          </Link>
        </div>
      <div className="Navbar__right">
         <p className="Navbar__right__subscribe">S'inscrire</p>
      </div>
    </nav>
  );
};

export default Navbar;
