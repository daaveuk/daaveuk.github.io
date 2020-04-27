import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MainContent = ({ children }) => <Container>{children}</Container>;

MainContent.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainContent;

const Container = styled.div`
  padding: 0 1rem;
`;
