import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import {Drawer, Divider, Button, Paper, Grid} from '@material-ui/core';
import {NavLink, withRouter} from "react-router-dom"

const styles = theme => ({
    list: {
        width: '100%',
    },
    active: {
        backgroundColor: theme.palette.cyan
    },

    menuItem:{
        margin:10
    },
    drawerTop: {
        height: 88,
        backgroundColor: theme.palette.primary.main,
        borderBottom: '2px solid #272723 ',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
        fontFamily: "'Monoton', cursive",
        color: '#ffffff',
        fontSize: 22,
        paddingRight: 10,
    },
});

class SideDrawer extends React.Component {
    render() {
        const {classes} = this.props;
        console.log(this.props.user)
        console.log(this.props.page)
        console.log(this.props)
        if (this.props.location.pathname === '/user/signOut' ) {
            this.props.signOut()
        }
        return (
            <Paper>
                <Drawer anchor="top" open={this.props.show} onClose={this.props.toggleShow}>
                    <div onClick={this.props.toggleShow} className={classes.drawerTop}>
                        Musical World
                    </div>
                    <div className={classes.list}>
                        <Grid container >
                            {this.props.page.map((item, i) =>
                                <Grid key={i} onClick={this.props.toggleShow} item xs={12} className={classes.menuItem}>
                                    <NavLink  to={item.linkTo}>
                                        <Button variant={this.props.location.pathname === item.linkTo ? "contained": "outlined"} fullWidth>{item.name}</Button>
                                    </NavLink>
                                </Grid>
                            )}
                        </Grid>
                        <Divider/>
                        <Grid container >
                            {this.props.user.map((item, i) =>
                                <Grid key={i} onClick={this.props.toggleShow} item xs={12} className={classes.menuItem}>
                                    <NavLink  to={item.linkTo}>
                                        <Button variant={this.props.location.pathname === item.linkTo ? "contained": "outlined"} fullWidth>{item.name}</Button>
                                    </NavLink>
                                </Grid>
                            )}
                        </Grid>
                    </div>


                </Drawer>
            </Paper>
        );
    }
}

SideDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(SideDrawer));
