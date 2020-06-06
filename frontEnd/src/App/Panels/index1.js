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
import Typography from '@material-ui/core/Typography';
import { Button,Input } from '@material-ui/core'
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

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
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
      },
  }));

export default function Index1(props) {
    const classes = useStyles();
    const [buttonOpen, buttonSetOpen] = React.useState(false);

  const buttonHandleOpen = () => {
    buttonSetOpen(true);
  };

  const buttonHandleClose = () => {
    buttonSetOpen(false);
  };

  return (
    <Grid container spacing={3}>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.Head}>
                <Grid container spacing={3}>

                  <Grid item xs={4}>
                    <TextField id="standard-basic" label="开始时间" />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField id="standard-basic" label="结束时间" />
                </Grid>
                  <Grid item xs={4}></Grid>
                  <Grid item xs={2}>
                    <Button variant="outlined" color="primary">查询</Button>
                  </Grid>

                  <Grid item xs={2}>
                    <Button variant="outlined" color="primary">新增</Button>
                  </Grid>
                  <Grid item xs={2}>
                    <div>
                      <Button variant="outlined" color="primary" onClick={buttonHandleOpen}>导入</Button>
                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={buttonOpen}
                        onClose={buttonHandleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                      >
                        <Fade in={buttonOpen}>
                          <div className={classes.paperModal}>
                            {/* <h2 id="transition-modal-title">Transition modal</h2> */}
                            {/* <p id="transition-modal-description">react-transition-group animates me.</p> */}
                            <Link color="inherit" href="https://material-ui.com/">
                              下载导入模板</Link>
                              <form action="http://127.0.0.1:3001/file/upload" method="post" enctype="multipart/form-data">
                    <input type="file"   name='file'/>
                    <input type="submit" value="上传"/>
                </form>
                          </div>
                        </Fade>
                      </Modal>
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <EventList />
              </Paper>
            </Grid>
          </Grid>
        //   <Box pt={4}>
        //     <Copyright />
        //   </Box>
  );
}

Index1.propTypes = {
  children: PropTypes.node,
};