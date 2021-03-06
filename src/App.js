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
import profilePic from './images/profilePic.png';
import Footer from './components/Footer/Footer';
import IconButton from './components/IconButton/IconButton';
import sendEmail from './functions/sendEmail';
import ProfilePicture from './components/ProfilePicture/ProfilePicture';

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
          <ProfilePicture src={profilePic} />
          <Title testId="title">Ey 'up!</Title>
        </Hero>
        <MainContent>
          <div>
            <p>
              I’m Dave, A quaint Yorkshireman living in Manchester. An
              experienced <strong>Front End Developer</strong>, I’m passionate
              about Javascript, Unit testing, UX and Accessibility.
            </p>
            <p>
              I’m currently part of a great team building great products at{' '}
              <strong>Interactive Investor</strong>.
            </p>
            <br />
            <p>Always happy for a chat! Why not drop me a line?</p>
            <Button href={sendEmail()}>
              <Emoji label="Email icon" symbol="📬" /> Get In Touch
            </Button>
            <p>You can also find me here!</p>
            <IconButton href="https://twitter.com/daaveuk/" icon="twitter" />
            <IconButton
              href="https://www.linkedin.com/in/daaveuk/"
              icon="linkedin"
            />
            <IconButton href="https://github.com/daaveuk/" icon="github" />
          </div>
        </MainContent>
        <Footer>
          <ThemeToggle
            id="themeToggle"
            handleToggle={handleToggle}
            value={isDarkMode}
          />
          <span>
            Made with <Emoji label="Love" symbol="❤️" /> by David Henderson.
          </span>
          <span>
            <a
              href="https://github.com/daaveuk/webpage"
              target="_blank"
              rel="noreferrer noopener"
            >
              View the code here.
            </a>
          </span>
        </Footer>
      </>
    </ThemeProvider>
  );
};

export default App;
