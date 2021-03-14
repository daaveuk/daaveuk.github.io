import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.a`
  background-color: black;
  background: ${({ theme }) => theme.buttonGradient};
  color: white;
  border-radius: 1.5rem;
  appearance: none;
  border: none;
  line-height: 3rem;
  font-weight: 700;
  cursor: pointer;
  font-size: 1rem;
  display: inline-block;
  padding: 0 1rem;
  text-decoration: none;
  ${({ theme }) => theme.hover}
`;

const Button = ({ href, children }) => (
  <StyledButton href={href}>{children}</StyledButton>
);

Button.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default Button;
