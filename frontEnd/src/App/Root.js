import React from 'react';
import {getData,register, unregister} from '../Store';
import {makeStyles, Popover, withStyles} from '@material-ui/core';
import SignInSide from './signInSide';
import IndexMain from './Panels/indexMain'

const styles = theme => ({
    root:{
        width:'100%',
        height:'100%'
    }
});

class Root extends React.Component {
  componentDidMount() {
    register('Root', this);
  }
  
  componentWillUnmount() {
    unregister('Root', this);
  }
    render() {
        const {classes} = this.props;
        const login = getData.status.login();
        console.log(login)
        return <div className ={classes.root}>
            {
          login?<IndexMain/>:<SignInSide />
        }
        </div>
    }
}
export default withStyles(styles)(Root);