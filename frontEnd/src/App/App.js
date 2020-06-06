import React from 'react';
import { Button, createMuiTheme, Container, fade, darken, MuiThemeProvider, withStyles } from '@material-ui/core';
import { backend, getData, handleChange, register, unregister } from '../Store';
import Root from './Root'


const styles = theme => ({
  root: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
  },

});

class App extends React.Component {
  componentDidMount() {
    register('App', this);
  }

  componentWillUnmount() {
    unregister('App', this);
  }

  getTheme = () => {
    const theme = createMuiTheme(getData.theme());
    theme.scrollArea = {
      '&::-webkit-scrollbar': {
        width: theme.spacing(1),
      },
      '&::-webkit-scrollbar-track': {
        display: 'none',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: fade(theme.palette.primary.light, 0),
        borderRadius: theme.spacing(1),
      },
      '&:hover::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.light,
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: theme.palette.primary.main,
      },
      '&::-webkit-scrollbar-thumb:active': {
        backgroundColor: theme.palette.primary.dark,
      },
    };
    return theme;
  };

  render() {
    const { classes } = this.props;
    const theme = this.getTheme();
    return <MuiThemeProvider theme={theme}>
      <div className={classes.root} style={{ backgroundColor: theme.palette.primary.light }}>
        <Root/>
      </div>
    </MuiThemeProvider>;
  }
}

export default withStyles(styles)(App);
