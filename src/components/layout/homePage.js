import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.jpg';

const StyledHomePageWrapper = styled.div`
  height: calc(100vh - 65px);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #659dbd;
  transition: 200ms;
  opacity: ${props => (props.isLoading ? 1 : 0)};
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  span {
    display: flex;
    background-color: #fbeec1;
    border-radius: 100%;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    position: relative;
    box-shadow: 0 0 6px 0 transparent;
    transition: 200ms;
    &:hover {
      box-shadow: 0 0 3px 0 black;
    }
    img {
      position: absolute;
      width: 100%;
    }
  }
  h2 {
    font-size: 2rem;
  }
  p {
    font-size: 1.2rem;
    text-align: center;
    padding: 0 8%;
  }

  div {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    a {
      color: white;
      background-color: #8d8741;
      padding: 15px 0;
      margin: 20px 0;
      padding-bottom: 17px;
      width: 250px;
      display: inline-flex;
      text-decoration: none;
      justify-content: center;
      &:hover {
        background-color: #bc986a;
      }
    }
  }
`;

const HomePage = ({ user, isLoading }) => {
  let homeLinks;
  if (!user.userId) {
    homeLinks = (
      <div>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link>
      </div>
    );
  } else {
    homeLinks = (
      <div>
        <Link to='/map'>Discover Fishable Waters</Link>
      </div>
    );
  }

  return (
    <StyledHomePageWrapper isLoading={!isLoading}>
      <section>
        <span>
          <img src={logo} alt='Fish Friends logo' />
        </span>
        <h2>Fish Friends</h2>
        <p>Discover, fish, and keep track of all your favorite fishing spots near you!</p>
        {homeLinks}
      </section>
    </StyledHomePageWrapper>
  );
};

export default HomePage;
