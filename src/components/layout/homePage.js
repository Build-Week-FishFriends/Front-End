import React from 'react';
import styled from 'styled-components';

const StyledHomePageWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 25%;
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
`;
const HomePage = () => (
  <StyledHomePageWrapper>
    <span role='img' aria-label='fishing-pole with fish on hook emoji'>
      🎣
    </span>
    <h2>Fish Friends</h2>
    <p>Discover, fish, and keep track of all your favorite fishing spots near you!</p>
  </StyledHomePageWrapper>
);

export default HomePage;
