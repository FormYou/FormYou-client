import React from 'react';
import './Footer.scss';
const Footer = () => {
  return (
    <div className="Footer">
      <ul>
	      <li><a href="">à propos de nous</a></li> 
	      <li><a href="">Nous contacter</a></li>
      </ul>
      <p>&copy; 2021 THP Team.</p>
      <address>
        Email: <a href="mailto:youform@mail.com">@addresse</a>
      </address>
    </div>
  );
};
export default Footer;