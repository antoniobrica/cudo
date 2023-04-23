import React from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme } from '@mui/material/styles';
import App from '../app/app';

const theme = createTheme({
  palette: {},
});

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App theme={theme} />);
}
