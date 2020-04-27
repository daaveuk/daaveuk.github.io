const backgroundStart = '#E0EDEC';
const backgroundEnd = '#89d3cf';

const lightTheme = {
  body: '#E0EDEC',
  backgroundAccent: backgroundEnd,
  text: '#215653',
  headerGradient: `linear-gradient(113.69deg, ${backgroundStart} -0.86%, ${backgroundEnd} -0.85%,rgba(224, 237, 236, 0.5) 86.05%);`,
  buttonGradient: 'linear-gradient(270deg, #f58555 0%, #e67272 100%)',
  hover: `
  position: relative;
  transition: all 0.1s ease-in;
  top: 0;
  &:hover {
    top: -2px;
    box-shadow: 0 1rem 1rem -0.5rem #89d3cf;
  }
  `,
};

export default lightTheme;
