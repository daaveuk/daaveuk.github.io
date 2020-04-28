import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Hero = ({ children }) => (
  <header>
    <HeaderBackground>
      <Container>{children}</Container>
    </HeaderBackground>
  </header>
);

Hero.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Hero;

const Container = styled.div`
  text-align: left;
  transform: translateY(2rem);
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  @media (min-width: 768px) {
    transform: translateY(6rem);
    margin: 0 auto;
    flex-direction: row;
    max-width: 1440px;
  }
`;

const HeaderBackground = styled.div`
  min-height: 6rem;
  margin-bottom: 3rem;
  background: ${({ theme }) => theme.headerGradient};
  @media (min-width: 768px) {
    min-height: 9rem;
    margin-bottom: 3rem;
  }
`;
