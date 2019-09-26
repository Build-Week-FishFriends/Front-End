import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import map from '../../assets/map.svg';
import profile from '../../assets/profile.svg';

const StyledNavBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  height: 65px;
  background-color: #fbeec1;
  box-shadow: 0px 0px 15px 0px black;
  color: #123607;
  font-family: 'Russo One', sans-serif;
  transition: 200ms;
  opacity: ${props => (props.isLoading ? 0 : 1)};
  nav {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    a,
    button.signOut {
      color: black;
      text-decoration: none;
      min-width: 35px;
      width: auto;
      background: none;
      border: none;
      margin: 0;
      font-family: inherit;
      img {
        width: 100%;
      }
    }
    button.signOut {
      margin-left: auto;
    }

    a:not(:last-of-type) {
      margin-right: 50px;
      margin-left: 25px;
    }
  }
`;

const NavBar = ({ user, logout, isLoading }) => {
  let navLinks;
  if (user.userId) {
    navLinks = (
      <>
        <Link to={`/${user.username}`}>
          <img src={profile} alt='profile icon' />
        </Link>
        <button className='signOut' to='/' onClick={() => logout()}>
          Logout
        </button>
      </>
    );
  } else {
    navLinks = (
      <>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link>
      </>
    );
  }

  return (
    <StyledNavBar isLoading={isLoading}>
      <nav>
        <Link to='/map'>
          <img src={map} alt='map icon' />
        </Link>
        {navLinks}
      </nav>
    </StyledNavBar>
  );
};

export default NavBar;
