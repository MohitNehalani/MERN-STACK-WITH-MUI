import React, {Component} from 'react';
import {connect } from "react-redux"
import {Route, Switch, withRouter} from 'react-router-dom';


import {withStyles} from "@material-ui/core";

import './App.css';
import Layout from "./hoc/Layout";
import Home from "./components/Home/Home";

import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp"
import UserLayout from "./components/User/user";

import Authenticate from "./hoc/Authenticate";


const styles = {
    '@global': {
        'html, body, #root': {
            height: '100%'
        }
    }
};

class App extends Component {
    render() {

        return (
            <Layout>
                <div style={{minHeight: '80vh'}}>
                    <Switch>
                        <Route path={'/user'} component={Authenticate(UserLayout, true)}/>
                        <Route path={'/signUp'} component={Authenticate(SignUp, false)}/>
                        <Route path={'/signIn'} component={Authenticate(SignIn, false)}/>
                        <Route exact path={'/'} component={Authenticate(Home, null)}/>
                    </Switch>
                </div>

            </Layout>
        )
    }
}

export default withRouter(connect()(withStyles(styles)(App)));
