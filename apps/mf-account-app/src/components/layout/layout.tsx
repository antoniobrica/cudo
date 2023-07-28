import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import useStyles from './style';

const Layout = ({ children }) => {
  // const classes = useStyles();
  return (
    <Container style={{ padding: 20 }}>
      <Grid container>
        <CssBaseline />
        {children}
      </Grid>
    </Container>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
