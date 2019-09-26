import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import map from '../../assets/map.svg';
import profile from '../../assets/profile.svg';
import { Label } from 'semantic-ui-react';

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
  nav {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;

    a {
      color: black;
      text-decoration: none;
      min-width: 35px;
      img {
        width: 100%;
      }
    }

    a:not(:last-of-type) {
      margin-right: 50px;
      margin-left: 25px;
    }
  }
`;
function logout() {
  localStorage.clear();
  window.location.href = '/';
}
const NavBar = ({ user }) => {
  let navLinks;
  if (user.userId) {
    navLinks = (
      <Link to={`/${user.username}`}>
        <img src={profile} alt='profile icon' />
      </Link>
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
    <StyledNavBar>
      <nav>
        <Link to='/map'>
          <img src={map} alt='map icon' />
        </Link>
        {navLinks}
        <a className='signOut' onClick={() => logout()}>
          Sign Out
        </a>
      </nav>
    </StyledNavBar>
  );
};

export default NavBar;
