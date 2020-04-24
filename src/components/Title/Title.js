import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Title = ({ children }) => <StyledTitle>{children}</StyledTitle>;

Title.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Title;

const StyledTitle = styled.span`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  font-size: 4rem;
  display: block;
  line-height: 5rem;
  color: ${({ theme }) => theme.text};
`;
