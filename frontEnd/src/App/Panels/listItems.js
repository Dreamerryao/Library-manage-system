import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { handleChange } from '../../Store';



export default function ListItems() {

  return(<div>
    <ListItem button onClick={()=>handleChange.changeIndex(0)}>
      <ListItemIcon >
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="图书管理" />
    </ListItem>
    {/* <ListItem button  onClick={()=>handleChange.changeIndex(1)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="借书管理" />
    </ListItem> */}
    <ListItem button  onClick={()=>handleChange.changeIndex(3)}>
      <ListItemIcon>
      <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="成员管理" />
    </ListItem>
  </div>)
};