import React from 'react';
import PropTypes from 'prop-types';

const Toggle = ({ handleToggle, id, value }) => (
  <label htmlFor={id} className="switch">
    <input
      id={id}
      name={id}
      type="checkbox"
      checked={value}
      onClick={handleToggle}
    />
    <span className="slider"></span>
  </label>
);

Toggle.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.bool.isRequired,
};

export default Toggle;
