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
import Footer from './components/Footer/Footer';
import IconButton from './components/IconButton/IconButton';
import sendEmail from './functions/sendEmail';

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

  const handleContact = () => {
    console.log(sendEmail());
    window.location.href = sendEmail();
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
            I’m Dave, A quaint Yorkshireman living in Manchester. An experienced{' '}
            <strong>Front End Developer</strong>, I’m passionate about
            Javascript, Unit testing, UX and Accessability.
          </p>
          <p>
            I’m currently part of a great team building great products at{' '}
            <strong>Kaboodle</strong>.
          </p>
          <br />
          <p>Always happy for a chat! Why not drop me a line?</p>
          <Button onClick={handleContact}>
            <Emoji label="Email icon" symbol="📬" /> Get In Touch
          </Button>
          <p>You can also find me here!</p>
          <IconButton href="https://twitter.com/daaveuk/" icon="twitter" />
          <IconButton
            href="https://www.linkedin.com/in/daaveuk/"
            icon="linkedin"
          />
          <IconButton href="https://github.com/daaveuk/" icon="github" />
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
