import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import * as actionCreators from "../../store/actions";
import {NavLink} from "react-router-dom";

import {IconButton, Badge, Button} from '@material-ui/core';
import {ShoppingCartOutlined, Menu} from '@material-ui/icons';

import classes from "./Header.module.css";
import MyDrawer from "./MyDrawer";
import isEmpty from "../../validation/is-empty"


class Header extends Component {

    state = {
        page: [
            {
                name: 'Home',
                linkTo: '/',
                public: true
            },
            {
                name: 'Guitars',
                linkTo: '/shop',
                public: true
            }
        ],
        user: [
            {
                name: 'My Cart',
                linkTo: '/user/cart',
                public: false
            },
            {
                name: 'My Account',
                linkTo: '/user/dashboard',
                public: false
            },
            {
                name: 'Sign in',
                linkTo: '/SignIn',
                public: true
            },
            {
                name: 'Sign up',
                linkTo: '/SignUp',
                public: true
            },
            {
                name: 'Sign out',
                linkTo: '/user/signOut',
                public: false
            },
        ]
    }


    cartLink = (item, i) => {
        const user = this.props.user;

        return (
            <NavLink key={i} activeClassName={classes.active} className={classes.link} exact to={item.linkTo}>
                <IconButton size={"small"} style={{color: "#ccc",}}>
                    <Badge style={{fontSize:"5px"}} badgeContent={isEmpty(user.cart) ? 0 : user.cart.length} color="error">
                        <ShoppingCartOutlined fontSize={"small"}/>
                    </Badge>
                </IconButton>
            </NavLink>
        )
    }


    defaultLink = (item, i) => (
        item.name === 'Sign out' ?
            <Button key={i} size="small" onClick={this.logoutUser}
                    style={{color: 'inherit', fontWeight: "bold"}}>{item.name}</Button>

            :
            <NavLink key={i} activeClassName={classes.active} className={classes.link} exact to={item.linkTo}>
                <Button size="small" style={{color: 'inherit', fontWeight: "bold"}}>{item.name}</Button>
            </NavLink>
    )


    showLinks = (type,MyDrawer) => {
        let list = [];

            type.forEach((item) => {
                if (!this.props.isAuth) {
                    if (item.public === true) {
                        list.push(item)
                    }
                } else {
                    if (item.name !== 'Sign in' && item.name !== 'Sign up') {
                        list.push(item)
                    }
                }
            });

        if (MyDrawer) {
            return list
        }
        return list.map((item, i) => {
            if (item.name !== 'My Cart') {
                return this.defaultLink(item, i)
            } else {
                return this.cartLink(item, i)
            }

        })
    }

    logoutUser = () => {
        this.props.logoutUser(this.props.history)
    };

    render() {
        return (
            <div className={classes.navBarBg}>
                <div className={classes.navBar}>
                    <div className={classes.brand}>
                        <NavLink className={classes.link} exact to={"/"}>
                            Musical World
                        </NavLink>
                    </div>
                    <div className={classes.menu}>
                        <div onClick={this.props.toggleShow}>
                            <IconButton style={{color: "#eeeeee"}}>
                                <Badge badgeContent={4} color="error" classes={{badge: classes.badge}}>
                                    <ShoppingCartOutlined/>
                                </Badge>
                            </IconButton>
                        </div>
                        <div onClick={this.props.toggleShow}>
                            <IconButton style={{color: "#eeeeee"}}>
                                <Menu/>
                            </IconButton>
                        </div>
                    </div>
                    <MyDrawer user={this.showLinks(this.state.user,MyDrawer)}
                              page={this.showLinks(this.state.page,MyDrawer)}
                              show={this.props.show}
                              toggleShow={this.props.toggleShow}
                              signOut={this.logoutUser}
                    />
                    <div className={classes.navLinks}>
                        <div className={classes.top}>
                            {this.showLinks(this.state.user)}
                        </div>
                        <div className={classes.bottom}>
                            {this.showLinks(this.state.page)}
                        </div>
                    </div>
                    <div className={classes.wasteSpace}>

                    </div>

                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        isAuth: state.auth.isAuthenticated

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: (history) => dispatch(actionCreators.logoutUser(history))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));