import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  height: 65px;
  background-color: white;

  nav {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    a:not(:last-of-type) {
      margin-right: 25px;
    }
  }
`;
const NavBar = ({ user }) => {
  let navLinks;
  if (user.isLoggedIn) {
    navLinks = <Link to={`/${user.userName}`}>Profile</Link>;
  } else {
    navLinks = (
      <>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link>
      </>
    );
  }

  return (
    <StyledNavBar>
      <nav>
        <Link to='/'>Map</Link>
        {navLinks}
      </nav>
    </StyledNavBar>
  );
};

export default NavBar;
