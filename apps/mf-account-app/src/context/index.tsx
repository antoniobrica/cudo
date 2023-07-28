import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { ThemeProvider, StylesProvider, createGenerateClassName } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import UseWindowEventListener from '../hooks/use-window-event-listener';
import { eventsToListen } from '../utils/events';

const defaultTheme = createTheme({
  palette: {},
});

const CombinedContextProvider = ({ children, theme }: { children: React.ReactNode; theme: any }) => {
  const [activeTheme, setActiveTheme] = useState(theme ?? defaultTheme);

  const handleThemeChanged = (e) => setActiveTheme(e.detail);
  UseWindowEventListener(eventsToListen.HOST_THEME_CHANGED, handleThemeChanged);

  return <ThemeProvider theme={activeTheme}>{children}</ThemeProvider>;
};

CombinedContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired,
};

export default CombinedContextProvider;
