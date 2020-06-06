import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import {makeStyles, Popover, withStyles,useTheme} from '@material-ui/core';
import BookList from '../UI/BookList'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button,Input } from '@material-ui/core'
import { getData, handleChange ,register,unregister} from '../../Store';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';


const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  footer:{
    display:'flex',
    justifyContent: 'flex-end',
  }
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
  

const styles = theme => ({
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
        // height:500,
      },
  });

  class Index0 extends React.Component {
    state = {
      buttonOpen:false,
      page:0,
      rowsPerPage:5,
      borrowOpen:false,
      returnOpen:false
  };
    componentDidMount() {
      register('Index0', this);
    }
    
    componentWillUnmount() {
      unregister('Index0', this);
    }
    render() {
      const {classes} = this.props;
      let rows = getData.book();
      const permission = getData.status.permission();
      const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, rows.length - this.state.page * this.state.rowsPerPage);
   
    console.log(rows)

    const handleChangePage = (event, newPage) => {
      this.setState({page:newPage})
      // setPage(newPage);
    };
  
    const handleChangeRowsPerPage = event => {
      // setRowsPerPage(parseInt(event.target.value, 10));
      this.setState({rowsPerPage:parseInt(event.target.value, 10)})
      this.setState({page:0})
      // setPage(0);
    };
  

  const borrowHandleOpen = ()=>{
    this.setState({borrowOpen:true})
  }
  const borrowHandleClose = () => {
    this.setState({borrowOpen:false})
  }

  const returnHandleOpen = () =>{
    this.setState({returnOpen:true})
  }
  const returnHandleClose = ()=>{
    this.setState({returnOpen:false})
  }

  const buttonHandleOpen = () => {
    this.setState({buttonOpen:true})
  };

  const buttonHandleClose = () => {
    this.setState({buttonOpen:false})
  };

  const query = ()=>{
    let bno = document.getElementById("bno").value;
    let category = document.getElementById("category").value;
    let title=document.getElementById("title").value;
    let press = document.getElementById("press").value;
    let year = document.getElementById("year").value;
    let author = document.getElementById("author").value;
    let price = document.getElementById("price").value
    console.log({bno,category,title,press,price,author})
    handleChange.bookquery(bno,category,title,press,year,price,author)
  }

  const borrowBook = () =>{
    let bno_borrow = document.getElementById("bno_borrow").value;
    let borrowTime = document.getElementById("borrowTime").value;
    handleChange.borrowBook(bno_borrow,borrowTime);
  }

  const returnBook = () =>{
    let bno_return = document.getElementById("bno_return").value;
    let returnTime = document.getElementById("returnTime").value;
    handleChange.returnBook(bno_return,returnTime);
  }

  const bookImport = ()=>{
    let bno = document.getElementById("bno").value;
    let category = document.getElementById("category").value;
    let title=document.getElementById("title").value;
    let num = document.getElementById("number").value;
    let press = document.getElementById("press").value;
    let year = document.getElementById("year").value;
    let author = document.getElementById("author").value;
    let price = document.getElementById("price").value;
    handleChange.bookImport(bno,category,title,press,num,year,price,author)
  }
  return (
    <Grid container spacing={3}>
            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.Head}>
                <Grid container spacing={3}>

                  <Grid item xs={3}>
                    <TextField id="bno" label="图书编号" />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField id="category" label="分类" />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField id="title" label="名称" />
                  </Grid>
                  <Grid item xs={3}> 
                    <TextField id ="year" label="出版年份,支持**-**"/>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField id="price" label="价格" />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField id="press" label="出版社" />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField id="author" label="作者" />
                  </Grid>
                  <Grid item xs={3}>
                  {!permission?<TextField id="number" label="导入数量" />:<div></div> }
                  </Grid>
                  <Grid item xs={2}>
                    <Button variant="outlined" color="primary" onClick={query}>查询</Button>
                  </Grid>

                  <Grid item xs={2} >
                    <Button variant="outlined" color="primary" onClick={bookImport} disabled={permission} >单个导入</Button>
                  </Grid>
                  <Grid item xs={2} >
                  </Grid>
                  <Grid item xs={2}>
                    <div>
                      <Button variant="outlined" color="primary" onClick={borrowHandleOpen}>借书</Button>
                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={this.state.borrowOpen}
                        onClose={borrowHandleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                      >
                       <Fade in={this.state.borrowOpen}>
                <div className={classes.paperModal}>
                  <form className={classes.form} noValidate autoComplete="off" >
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="bno_borrow"
                      label="借书编号"
                      
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      label="借书时间"
                      id="borrowTime"
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={borrowBook}
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
                    <div>
                      <Button variant="outlined" color="primary" onClick={returnHandleOpen}>还书</Button>
                      <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        className={classes.modal}
                        open={this.state.returnOpen}
                        onClose={returnHandleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 500,
                        }}
                      >
                       <Fade in={this.state.returnOpen}>
                <div className={classes.paperModal}>
                  <form className={classes.form} noValidate autoComplete="off" >
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="bno_return"
                      label="还书编号"
                      
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      label="还书时间"
                      id="returnTime"
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={returnBook}
                    >
                      提交
                </Button>
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
              <Table className={classes.table} aria-label="simple table">
        <TableHead stickyHeader>
          
          <TableRow>
            <TableCell align="center">图书编号</TableCell>
            <TableCell align="center">分类</TableCell>
            <TableCell align="center">名称</TableCell>
            <TableCell align="center">出版社</TableCell>
            <TableCell align="center">出版年份</TableCell>
            <TableCell align="center">作者</TableCell>
            <TableCell align="center">价格</TableCell>
            <TableCell align="center">总量</TableCell>
            <TableCell align="center">库存</TableCell>

            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
          
        </TableHead>
        <TableBody>
           {(this.state.rowsPerPage > 0
            ? rows.slice(this.state.page * this.state.rowsPerPage, 
              this.state.page * this.state.rowsPerPage +this.state.rowsPerPage)
            : rows
          ).map((row) => {
            return <TableRow
            hover
            tabIndex={-1}
            key = {row.bno}
          ><TableCell align="center">{row.bno}</TableCell>
          <TableCell align="center" >{row.category}</TableCell>
          <TableCell align="center">{row.title}</TableCell>
          <TableCell align="center">{row.press}</TableCell>
          <TableCell align="center">{row.year}</TableCell>
          <TableCell align="center">{row.author}</TableCell>
          <TableCell align="center">{row.price}</TableCell>
          <TableCell align="center">{row.total}</TableCell>
          <TableCell align="center">{row.stock}</TableCell>
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
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
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
              </Paper>
            </Grid>
          </Grid>
        //   <Box pt={4}>
        //     <Copyright />
        //   </Box>
  );
          }
}
export default withStyles(styles)(Index0);