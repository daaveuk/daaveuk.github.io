import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Title = ({ children, testId }) => (
  <StyledTitle data-testid={testId}>{children}</StyledTitle>
);

Title.propTypes = {
  children: PropTypes.element.isRequired,
  testId: PropTypes.string.isRequired,
};

export default Title;

const StyledTitle = styled.h1`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  font-size: 4rem;
  display: block;
  margin: 0;
  line-height: 5rem;
  color: ${({ theme }) => theme.text};
  @media (min-width: 768px) {
    font-size: 6rem;
  }
`;
