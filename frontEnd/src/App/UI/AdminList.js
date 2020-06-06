import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Title from './Title';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import { Button, Input } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import {getData,handleChange,register, unregister} from '../../Store';
const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  footer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}


const useStyles2 = makeStyles(theme => ({
  table: {
    minWidth: 475,
  },
  footer: {
    justifyContent: 'flex-end',
    overflow: 'hidden',
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
    width: 400,
    height: 400
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
  },
}));

export default function AdminList(props) {
  const classes = useStyles2();
  const {userlist,member} = props
  console.log(userlist.length)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [buttonOpen, buttonSetOpen] = React.useState(false);
  const [deleteOpen, deleteSetOpen] = React.useState(false);

  const buttonHandleOpen = () => {
    buttonSetOpen(true);
  };

  const buttonHandleClose = () => {
    buttonSetOpen(false);
  };
  const deleteHandleOpen = () => {
    deleteSetOpen(true);
  };

  const deleteHandleClose = () => {
    deleteSetOpen(false);
  };


  const emptyRows = rowsPerPage - Math.min(rowsPerPage, userlist.length - page * rowsPerPage);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const SubmitFunc = (member) => {
    let username = document.getElementById("username").value;
    // console.log(username);
    let pwd = document.getElementById("password").value;
    // console.log(handleChange.signIn(username,pwd))
    handleChange.submit(username, pwd,member)
    buttonHandleClose()
  }
  const SubmitDeleteFunc = () => {
    let username = document.getElementById("usernameDelete").value;
    // console.log(username);
    // console.log(handleChange.signIn(username,pwd))
    handleChange.deleteSubmit(username)
    deleteHandleClose()
  }


  return (
    <React.Fragment>

      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Title>{member?'会员列表':'管理员列表'}</Title>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={2}>
          <div>
            <Button variant="outlined" color="primary" onClick={buttonHandleOpen}>新增</Button>
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
                  <form className={classes.form} noValidate autoComplete="off" >
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="username"
                      label="用户名"
                      name="username"
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="密码"
                      id="password"
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => SubmitFunc(member)}
                    >
                      提交
                </Button>
                  </form>

                </div>
              </Fade>
            </Modal>
          </div>
        </Grid>
        <Grid item xs={2}>
          {
            member===true?<div>
              <Button variant="outlined" color="primary" onClick={deleteHandleOpen}>删除</Button>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={deleteOpen}
              onClose={deleteHandleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={deleteOpen}>
                <div className={classes.paperModal}>
                  <form className={classes.form} noValidate autoComplete="off" >
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="usernameDelete"
                      label="用户名"
                      name="username"
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => SubmitDeleteFunc()}
                    >
                      提交
                </Button>
                  </form>

                </div>
              </Fade>
            </Modal>
            </div>:<div></div>
          }
        </Grid>
      </Grid>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell align="center">用户名</TableCell>
            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? userlist.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : userlist
          ).map((row, index) => {
            return <TableRow
              hover
              tabIndex={-1}
              key = {row.username}
            >
              <TableCell align="center" >{row.username}</TableCell>
            </TableRow>
          })}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter className={classes.footer}>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={userlist.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                // native: true,
              }}

              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </React.Fragment>
  );
}