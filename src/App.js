import React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from './styles';
import Button from './components/Button/Button';
import Title from './components/Title/Title';
import Hero from './components/Hero/Hero';
import MainContent from './components/MainContent/MainContent';
import { useDarkMode } from './hooks/useDarkMode';
import Emoji from './components/Emoji/Emoji';
import Toggle from './components/Toggle/Toggle';

const App = () => {
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <Hero>
          <Title>Ey 'up!</Title>
        </Hero>
        <MainContent>
          <p>
            I’m Dave, A quaint yorkshireman living in Manchester. An experienced{' '}
            <strong>Front End Developer</strong>, I’m passionate about
            Javascript, Unit testing, UX and Accessability.
          </p>
          <p>
            I’m currently part of a great team building great products at{' '}
            <strong>Kaboodle</strong>.
          </p>
          <br />
          <p>Always happy for a chat! Why not drop me a line?</p>
          <Button>Get In Touch</Button>
          <p>You can also find me here!</p>
        </MainContent>
        <Emoji label="Sun Emoji" symbol="🌞" />
        <Toggle />
        <Emoji label="Moon Emoji" symbol="🌚" />
      </>
    </ThemeProvider>
  );
};

export default App;
