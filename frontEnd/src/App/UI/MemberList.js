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
import { Button,Input } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  footer:{
    display:'flex',
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

function createData(id,username,name,phone,authority,state){
    return{id,username,name,phone,authority,state};
  }
  
  const rows = [
    
    createData(0, "admin",'王祚滨','18888912152','0',''),
    createData(1, "admin",'王祚滨','18888912152','0',''),
    createData(2,  "admin",'王祚滨','18888912152','0',''),
    createData(3,  "admin",'王祚滨','18888912152','0',''),
    createData(4,  "admin",'王祚滨','18888912152','0',''),
    createData(5,  "admin",'王祚滨','18888912152','0',''),
    createData(6,  "admin",'王祚滨','18888912152','0',''),
    createData(7,  "admin",'王祚滨','18888912152','0',''),
  ];
  

const useStyles2 =  makeStyles(theme => ({
  table: {
    minWidth: 475,
  },
  footer:{
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
    width:600,
    height:400
  },
  paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'hidden',
      flexDirection: 'column',
    },
}));

export default function MemberList() {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [selected, setSelected] = React.useState([])
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [buttonOpen, buttonSetOpen] = React.useState(false);

  const buttonHandleOpen = () => {
    buttonSetOpen(true);
  };

  const buttonHandleClose = () => {
    buttonSetOpen(false);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isSelected = name => selected.indexOf(name) !== -1;



  return (
    <React.Fragment>
      
                <Grid container spacing={3}>
                <Grid item xs={4}>
                <Title>成员列表</Title>
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
                          <Grid container spacing={3}>
                          <Grid item xs={6}>
                          <TextField id="standard-basic" label="用户名" />
                          </Grid>
                          <Grid item xs={6}>
                          <TextField id="standard-basic" label="手机号码" />
                          </Grid>
                          
                          <Grid item xs={6}>
                          <TextField id="standard-basic" label="姓名" />
                          </Grid>
                          <Grid item xs={6}>
                          <TextField id="standard-basic" label="状态" />
                          </Grid>
                          
                          <Grid item xs={6}>
                          <TextField id="standard-basic" label="权限" />
                          </Grid>
                          <Grid item xs={6}>
                          <TextField id="standard-basic" label="活动管理" />
                          </Grid>
                          {/* <Grid item xs={1}>
                          
                          </Grid> */}
                          <Grid item xs={3}>
                          <Button variant="outlined" color="primary">密码重置</Button>
                          </Grid>
                          <Grid item xs={3}></Grid>
                          <Grid item xs={3}></Grid>
                          </Grid>
                             
                            {/* <Link color="inherit" href="https://material-ui.com/">
                              下载导入模板</Link>
                              <form action="http://127.0.0.1:3001/file/upload" method="post" enctype="multipart/form-data">
                    <input type="file"   name='file'/>
                    <input type="submit" value="上传"/>
                </form> */}
                          </div>
                        </Fade>
                      </Modal>
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <Button variant="outlined" color="primary">删除</Button>
                  </Grid>
                </Grid>
      <Table className={classes.table} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
          <TableCell padding="checkbox"></TableCell>
            <TableCell align="center">用户名</TableCell>
            <TableCell align="center">权限</TableCell>

            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row,index) => {
            const isItemSelected = isSelected(row.id);
            const labelId = `StudentList-checkbox-${index}`;
            return<TableRow 
            hover
            onClick={event => handleClick(event, row.id)}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.id}
            selected={isItemSelected}
            >
              <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
              </TableCell>
            <TableCell align="center" id={labelId}>{row.username}</TableCell>
            <TableCell align="center">{row.authority}</TableCell>
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
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              root={classes.rootRoot}
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