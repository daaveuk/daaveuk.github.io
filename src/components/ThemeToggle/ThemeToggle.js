import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Emoji from '../Emoji/Emoji';
import Toggle from '../Toggle/Toggle';

const ThemeToggle = ({ id, handleToggle, value }) => (
  <ThemeToggleWrapper>
    <ToggleLabel>
      <Emoji label="Sun Emoji" symbol="🌞" />
    </ToggleLabel>
    <Toggle id={id} handleToggle={handleToggle} value={value} />
    <ToggleLabel>
      <Emoji label="Moon Emoji" symbol="🌙" />
    </ToggleLabel>
  </ThemeToggleWrapper>
);

ThemeToggle.propTypes = {
  id: PropTypes.string.isRequired,
  handleToggle: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
};

const ThemeToggleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ToggleLabel = styled.p`
  margin: 0 0.3rem;
`;

export default ThemeToggle;
