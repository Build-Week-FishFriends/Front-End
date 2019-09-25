import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import map from "../../assets/map.svg";
import profile from "../../assets/profile.svg";

const StyledNavBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  height: 65px;
  background-color: white;
  box-shadow: 0px 0px 15px 0px black;

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
const NavBar = ({ user }) => {
  let navLinks;
  if (user.userId) {
    navLinks = (
      <Link to={`/${user.userName}`}>
        <img src={profile} alt="profile icon" />
      </Link>
    );
  } else {
    navLinks = (
      <>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </>
    );
  }

  return (
    <StyledNavBar>
      <nav>
        <Link to="/map">
          <img src={map} alt="map icon" />
        </Link>
        {navLinks}
      </nav>
    </StyledNavBar>
  );
};

export default NavBar;
