import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Image from '../Image/Image';

const ProfilePicture = props => <StyledImage {...props} />;

ProfilePicture.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const StyledImage = styled(Image)`
  width: 4rem;
  height: 4rem;
  @media (min-width: 768px) {
    width: 6rem;
    height: 6rem;
    margin-right: 1rem;
  }
`;

export default ProfilePicture;
