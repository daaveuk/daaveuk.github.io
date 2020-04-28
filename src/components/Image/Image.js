import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Image = props => <StyledImage {...props} />;

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
};

Image.defaultProps = {
  height: null,
  width: null,
};

const StyledImage = styled.img`
  min-width: ${({ width }) => width};
  min-height: ${({ height }) => height};
  display: block;
`;

export default Image;
