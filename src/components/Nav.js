import React from 'react';
import Account from './Account';
import classes from './styles/Nav.module.css';
import logoBg from './assets/images/logo-bg.png';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <Link to='/' className={classes.brand}>
            <img src={logoBg} alt="Learn with Siam Logo" />
            <h3>Learn with Siam</h3>
          </Link>
        </li>
      </ul>
      <Account />
    </nav>
  );
};

export default Nav;