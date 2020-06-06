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

function createData(id,name,date,where,score,opacity,type){
    return{id,name,date,where,score,opacity,type};
  }
  
  const rows = [
    
    createData(0, 'fuck','2019-9-20','lalala','20','1','wdnmd'),
    createData(1, 'fuck','2019-9-20','lalala','20','1','wdnmd'),
    createData(2,  'fuck','2019-9-20','lalala','20','1','wdnmd'),
    createData(3,  'fuck','2019-9-20','lalala','20','1','wdnmd'),
    createData(4,  'fuck','2019-9-20','lalala','20','1','wdnmd'),
    createData(5,  'fuck','2019-9-20','lalala','20','1','wdnmd'),
    createData(6,  'fuck','2019-9-20','lalala','20','1','wdnmd'),
    createData(7,  'fuck','2019-9-20','lalala','20','1','wdnmd'),
  ];
  

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function EventList() {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [selected, setSelected] = React.useState([])
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
      <Title>活动列表</Title>
      <Table className={classes.table} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
          <TableCell padding="checkbox"></TableCell>
            <TableCell align="center">名称</TableCell>
            <TableCell align="center">时间</TableCell>
            <TableCell align="center">地点</TableCell>
            <TableCell align="center">分值</TableCell>
            <TableCell align="center">容量</TableCell>
            <TableCell align="center">模块类型</TableCell>

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
            // selected={isItemSelected}
            >
              <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
              </TableCell>
            <TableCell align="center" id={labelId}>{row.name}</TableCell>
            <TableCell align="center">{row.date}</TableCell>
            <TableCell align="center">{row.where}</TableCell>
            <TableCell align="center">{row.score}</TableCell>
            <TableCell align="center">{row.opacity}</TableCell>
            <TableCell align="center">{row.type}</TableCell>
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