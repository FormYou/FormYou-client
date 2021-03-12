import React from 'react';
import './Footer.scss';
const Footer = () => {
  return (
    <div className="footer">
      <ul>
	      <li><a href="">à propos de nous</a></li> 
	      <li><a href="">Nous contacter</a></li>
      </ul>

  &copy; 2021 THP Team.

    <address>
      Email: <a href="mailto:youform@mail.com">@addresse</a>
    </address>
  </div>
  );
};
export default Footer;