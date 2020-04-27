const backgroundStart = '#2A3541';
const backgroundEnd = '#45525F';

export const darkTheme = {
  body: backgroundEnd,
  text: '#E9F0F8',
  backgroundAccent: backgroundStart,
  headerGradient: `linear-gradient(113.53deg, ${backgroundStart} 0%, rgba(57, 70, 83, 0) 86.04%)`,
  buttonGradient: 'linear-gradient(270deg, #f58555 0%, #e67272 100%)',
  hover: `
  position: relative;
  transition: all 0.1s ease-in;
  top: 0;
  &:hover {
    top: -2px;
    box-shadow: 0 1rem 1rem -0.5rem #0a0e13c4;
  }
  `,
};

export default darkTheme;
