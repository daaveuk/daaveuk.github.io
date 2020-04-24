import React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme, GlobalStyles } from './styles';
import Button from './components/Button/Button';
import Title from './components/Title/Title';
import Hero from './components/Hero/Hero';
import MainContent from './components/MainContent/MainContent';
import { useDarkMode } from './hooks/useDarkMode';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import Emoji from './components/Emoji/Emoji';
import Image from './components/Image/Image';
import profilePic from './images/profilePic.png';

const App = () => {
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  const handleToggle = () => {
    if (theme === 'light') {
      toggleTheme('dark');
    } else {
      toggleTheme('light');
    }
  };

  const isDarkMode = theme === 'dark';

  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <Hero>
          <Image src={profilePic} />
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
          <Button>
            <Emoji label="Email icon" symbol="📬" /> Get In Touch
          </Button>
          <p>You can also find me here!</p>
        </MainContent>
        <ThemeToggle
          id="themeToggle"
          handleToggle={handleToggle}
          value={isDarkMode}
        />
      </>
    </ThemeProvider>
  );
};

export default App;
