import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Footer = ({ children }) => <StyledFooter>{children}</StyledFooter>;

Footer.propTypes = {
  children: PropTypes.element.isRequired,
};

const StyledFooter = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.backgroundAccent};
`;

export default Footer;
