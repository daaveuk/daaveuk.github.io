import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import line from '../../images/line.svg';

const MainContent = ({ children }) => (
  <Container>
    <Line svg={line} />
    <PageContent>{children}</PageContent>
  </Container>
);

MainContent.propTypes = {
  children: PropTypes.element.isRequired,
};

const Container = styled.main`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    margin: 0 auto;
    flex-direction: row;
    max-width: 1440px;
  }
`;

const Line = styled.div`
  width: 6rem;
  margin-top: 1.4rem;
  margin-right: 1.5rem;
  height: 10rem;
  background-image: url(${({ svg }) => svg});
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: top;
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
`;

const PageContent = styled.div`
  max-width: 30rem;
`;

export default MainContent;
