import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux"

import {
   withStyles,
   Grid,
   Drawer,
   Typography,
   MenuItem,
   MenuList,
   ListItemIcon,
   ListItemText,
   Divider,
   IconButton,
    withTheme
} from '@material-ui/core';
import {Person, ShoppingCartOutlined, VerifiedUserOutlined, Settings} from '@material-ui/icons';

import {NavLink, Route, withRouter} from "react-router-dom";
import UserDashboard from "./index";
import store from "../../createStore";
import * as actionCreators from "../../store/actions";
import ProfileInfoUpdate from "./ProfileInfoUpdate";



const styles = theme => {
   console.log(theme)
   return ({
      root: {
         display: 'flex',
      },
      menuItem: {
         '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& $primary, & $icon': {
               color: theme.palette.common.white,
            },
         },
      },
      primary: {},
      icon: {},
      settingsButton: {
         position: "fixed",
         zIndex: 1550,
         top: 95,
         left: 0,
         width: 48,
         height: 48,
         borderTopRightRadius: 8,
         borderBottomRightRadius: 8,
         backgroundColor: theme.palette.cyan,
         margin: theme.spacing.unit,
         marginLeft: 0,
          opacity:"0.6",
         [theme.breakpoints.up('xs')]: {
            display: 'none'
         },
         [theme.breakpoints.down('xs')]: {
            display: 'block'
         }
      },
      headingLeft: {
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         padding: 10,
      },
      drawerTop: {
         height: 88,
         backgroundColor: theme.palette.primary.main,
         borderBottom: '2px solid #272723 '
      },
      left: {
         borderRight:'1px solid #eee',
         [theme.breakpoints.down('xs')]: {
            display: 'none'
         }
      },
      right: {
         padding: theme.spacing.unit
      },
      active: {
         borderBottom: '2px solid blue'
      },
      menuButton: {
         marginRight: 20,
         [theme.breakpoints.up('sm')]: {
            display: 'none',
         },
      },

   })
};

class UserLayout extends React.Component {
   state = {
      openDrawer: false,

      links: [
         {
            name: 'My account',
            linkTo: '/user/dashboard',
            icon: <Person/>
         },
         {
            name: 'Profile',
            linkTo: '/user/user_profile',
            icon: <VerifiedUserOutlined/>
         },
         {
            name: 'My Cart',
            linkTo: '/user/cart',
            icon: <ShoppingCartOutlined/>
         },
      ],

      admin: [
         {
            name: 'Site info',
            linkTo: '/admin/site_info'
         },
         {
            name: 'Add products',
            linkTo: '/admin/add_product'
         },
         {
            name: 'Manage categories',
            linkTo: '/admin/manage_categories'
         },
         {
            name: 'Upload file',
            linkTo: '/admin/add_file'
         }
      ]


   };

   handleDrawerToggle = () => {
      this.setState(state => ({openDrawer: !state.openDrawer}));
   };

   render() {
      const {classes} = this.props;

      const drawer = (
          <div>
             <div className={classes.headingLeft}>
                <Typography variant={"h5"}><b>My Account</b></Typography>
             </div>
             <Divider/>
             <MenuList>
                {this.state.links.map((text, index) => (
                    <NavLink  to={text.linkTo} key={index}>
                       <MenuItem className={classes.menuItem} button key={text}>
                          <ListItemIcon className={classes.icon}>{text.icon}</ListItemIcon>
                          <ListItemText classes={{ primary: classes.primary }} primary={text.name}/>
                       </MenuItem>
                    </NavLink>
                ))}
             </MenuList>
             <Divider/>
             <div className={classes.headingLeft}>
                <Typography variant={"h5"}><b>ADMIN</b></Typography>
             </div>
             <Divider/>
             <MenuList>
                {this.state.admin.map((text, index) => (
                    <NavLink className={classes.active} to={text.linkTo} key={index}>
                       <MenuItem className={classes.menuItem} button key={text}>
                          <ListItemText classes={{ primary: classes.primary }} primary={text.name}/>
                       </MenuItem>
                    </NavLink>
                ))}
             </MenuList>
          </div>
      );

      return (
          <Grid container direction={"row"}>
             <div onClick={this.handleDrawerToggle} className={classes.settingsButton}>
                <IconButton><Settings/></IconButton>
             </div>
             <Drawer open={this.state.openDrawer} onClose={this.handleDrawerToggle}>
                <div className={classes.drawerTop}>

                </div>
                <div onClick={this.handleDrawerToggle}>
                   {drawer}
                </div>

             </Drawer>
             <Grid item sm={3} className={classes.left}>
                {drawer}
             </Grid>
             <Grid item sm={9} xs={12} className={classes.right}>

                <Route path={this.props.match.url + '/dashboard'} render={() => {
                   store.dispatch(actionCreators.clearErrors())
                   return <UserDashboard user={this.props.user}/>
                }}/>
                <Route path={this.props.match.url + '/user_profile'} component={ProfileInfoUpdate}/>

             </Grid>
          </Grid>
      );
   }
}

UserLayout.propTypes = {
   classes: PropTypes.object.isRequired,
   // Injected by the documentation to work in an iframe.
   // You won't need it on your project.
   container: PropTypes.object,
   theme: PropTypes.object.isRequired,
};
const mapStateToProps = state => {
   return {
      user: state.auth.user
   }
}

export default withTheme()(withRouter(withStyles(styles)(connect(mapStateToProps)(UserLayout))));