import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IconButton = ({ icon, href }) => (
  <StyledIcon href={href} icon={icon} target="_blank" rel="noreferrer noopener">
    <FontAwesomeIcon icon={['fab', icon]} />
  </StyledIcon>
);

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

const StyledIcon = styled.a`
  line-height: 3rem;
  width: 3rem;
  text-align: center;
  border-radius: 50%;
  display: inline-block;
  background-color: red;
  color: white;
  ${({ theme }) => theme.hover}
  & + & {
    margin-left: 0.5rem;
  }
  ${props =>
    props.icon === 'github' &&
    css`
      background: white;
      color: black;
    `}
  ${props =>
    props.icon === 'twitter' &&
    css`
      background: #1da1f2;
    `}
    ${props =>
      props.icon === 'linkedin' &&
      css`
        background: #007bb5;
      `}
`;

export default IconButton;
