const backgroundEnd = '#EBECF0';
const backgroundStart = '#FFFFFE';

const lightTheme = {
  body: backgroundStart,
  backgroundAccent: backgroundEnd,
  text: '#45525F',
  headerGradient: `linear-gradient(142.5deg, ${backgroundEnd} -0.86%, ${backgroundStart} 86.05%)`,
  buttonGradient: 'linear-gradient(270deg, #f58555 0%, #e67272 100%)',
  hover: `
  position: relative;
  transition: all 0.1s ease-in;
  top: 0;
  &:hover {
    top: -2px;
    box-shadow: 0 1rem 1rem -0.5rem #A9B2BB;
  }
  `,
};

export default lightTheme;
