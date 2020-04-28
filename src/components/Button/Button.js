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
  font-size: 1rem;
  ${({ theme }) => theme.hover}
`;

const Button = ({ onClick, children }) => (
  <StyledButton onClick={onClick}>{children}</StyledButton>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Button;
