import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
  background-color: black;
  background: ${({ theme }) => theme.buttonGradient};
  color: white;
  border-radius: 1.5rem;
  appearance: none;
  border: none;
  line-height: 3rem;
  min-width: 10rem;
  font-weight: 700;
  cursor: pointer;
`;

const Button = ({ handleClick, children }) => (
  <StyledButton onClick={handleClick}>{children}</StyledButton>
);

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Button;
