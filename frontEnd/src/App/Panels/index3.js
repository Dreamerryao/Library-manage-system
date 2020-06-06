import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import EventList from '../UI/EventList'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AdminList from '../UI/AdminList'
import {getData,register, unregister} from '../../Store';
const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
    },
    Head: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paperModal: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      width:600,
      height:400
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
  }));

export default function Index3(props) {
    const classes = useStyles();
    const userlist = getData.users();
    let adminList = [];
    let memberList = [];
    userlist.forEach(user=>{
      if (user.authority==='1')
      memberList.push(user)
      else if(user.authority==='0')
      adminList.push(user)
    })
  return (
    <Grid container spacing={3}>
            <Grid item xs={12}>
            </Grid>
           
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <AdminList userlist={adminList} member={false}/>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <AdminList userlist={memberList} member={true} />
              </Paper>
            </Grid>
          </Grid>
  );
}

Index3.propTypes = {
  children: PropTypes.node,
};