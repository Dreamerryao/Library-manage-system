import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import Img from '../image/3.jpg'
import { handleChange, register, unregister } from '../Store';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {" dreamerryao"}
      {'.'}
    </Typography>
  );
}

const styles = theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${Img})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'left',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',

    flexDirection: 'column',
    alignItems: 'center',
    flex: '1',
  },
  right: {
    width: "100%",
    height: "100%",
    display: 'flex',
    flexDirection: 'column',
    borderRadius:'10px'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    // marginTop: theme.spacing(1),
    margin: 'auto auto'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }, link: {
    textDecoration: 'none',
    color: 'inherit',
    height: 56,
    '@media (min-width:0px) and (orientation: landscape)': {
      minHeight: 48,
    },
    '@media (min-width:600px)': {
      minHeight: 64,
    }
  },
});


class SignInSide extends React.Component {


  componentDidMount() {
    register('SignInSide', this);
  }

  componentWillUnmount() {
    unregister('SignInSide', this);
  }
  render() {
    const { classes } = this.props;
    const signInFunc = () => {
      let username = document.getElementById("username").value;
      // console.log(username);
      let pwd = document.getElementById("password").value;
      // console.log(handleChange.signIn(username,pwd))
      handleChange.signIn(username, pwd)
    }
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={8} className={classes.image}>
        </Grid>
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} style={{
          borderRadius:'10px'}}>
          <Box boxShadow={3} className={classes.right}>
            <div flex={1}></div>
            <div className={classes.paper} >
              <form className={classes.form} noValidate autoComplete="off" >
                <div>
                  <h2>
                  Library management system
                  </h2>
              </div>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => signInFunc()}
                >
                  Sign In
              </Button>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
            <div flex={1}></div>
          </Box>
        </Grid>
      </Grid>
    );
  }

}
export default withStyles(styles)(SignInSide);