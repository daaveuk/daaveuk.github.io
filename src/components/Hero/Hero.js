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
`;

const HeaderBackground = styled.div`
  min-height: 6rem;
  margin-bottom: 3rem;
  background: ${({ theme }) => theme.headerGradient};
`;
