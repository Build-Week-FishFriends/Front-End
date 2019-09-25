import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledHomePageWrapper = styled.div`
  height: calc(100vh - 130px);
  display: flex;
  align-items: center;
  justify-content: center;
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  span {
    font-size: 3rem;
  }
  h2 {
    font-size: 2rem;
  }
  p {
    font-size: 1.2rem;
    text-align: center;
  }

  div {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    a {
      color: white;
      background-color: #1abc9c;
      padding: 15px 0;
      margin: 20px 0;
      padding-bottom: 17px;
      width: 250px;
      display: inline-flex;
      text-decoration: none;
      justify-content: center;
      &:hover {
        background-color: #109177;
      }
    }
  }
`;
const HomePage = () => (
  <StyledHomePageWrapper>
    <section>
      <span role='img' aria-label='fishing-pole with fish on hook emoji'>
        🎣
      </span>
      <h2>Fish Friends</h2>
      <p>Discover, fish, and keep track of all your favorite fishing spots near you!</p>
      <div>
        <Link to='/login'>Login</Link>
        <Link to='/signup'>Signup</Link>
      </div>
    </section>
  </StyledHomePageWrapper>
);

export default HomePage;
