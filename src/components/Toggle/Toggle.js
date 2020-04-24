import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Toggle = ({ handleToggle, id, value }) => (
  <CheckBoxWrapper>
    <CheckBox id={id} type="checkbox" onClick={handleToggle} checked={value} />
    <CheckBoxLabel htmlFor={id} />
  </CheckBoxWrapper>
);

Toggle.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
};

const CheckBoxWrapper = styled.div`
  position: relative;
  display: inline-block;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 47px;
  height: 30px;
  border-radius: 15px;
  border: 3px solid #e67272;
  background-color: white;
  cursor: pointer;
  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    margin: 2px;
    background: ${({ theme }) => theme.buttonGradient};
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 42px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    &::after {
      content: '';
      display: block;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      background-color: #e67272;
      margin-left: 19px;
      transition: 0.2s;
    }
  }
`;

export default Toggle;
