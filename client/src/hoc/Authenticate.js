import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from "../store/actions";
import SpinnerBig from "../components/UI/Spinner/SpinnerBig";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import store from "../createStore";
import {setCurrentUser} from "../store/actions/auth";


// Private can be true means Authenticated user can access that route
// Private can be false means Authenticate is not required

export default function (ComponentToRender, Private, AdminRoute = null) {
    class AuthenticationCheck extends Component {

        state = {
            loadingBig: true
        }
        checkAuth = () => {
            if (!this.props.isAuthenticated) {
                if (Private) {
                    this.props.history.push('/signIn')
                }
            } else {
                if (AdminRoute && !this.props.isAdmin) {
                    this.props.history.push('/user/dashboard')
                } else {
                    if (Private === false) {
                        this.props.history.push('/user/dashboard')
                    }
                }
            }
        }

        componentDidMount() {
            this.props.dispatch(actionCreators.loading(false))
            this.props.dispatch(actionCreators.clearErrors())// so that errors of onr form are shown on other form

            let {user} = this.props;

            if (localStorage.jwtToken) {
                // Set user and isAuthenticated
                // with store.dispatch() we can call dispatch from anyware in our app
                // if we have connect() then we can dispatch action as
                // this.props.dispatch(setCurrentUser(decoded)).then(response =>{}) -- because of redux-promise
                // store.dispatch(setCurrentUser(decoded));
                //or without call to actionCreators just like this
                //store.dispatch(setCurrentUser({})); actionCreators import is used to avoid any typo

                // Decode token and get user info and exp
                const decoded = jwt_decode(localStorage.jwtToken);

                // Check for expired token
                const currentTime = Date.now() / 1000;
                if (decoded.exp < currentTime) {
                    // Remove token from localStorage
                    localStorage.removeItem('jwtToken');
                    // Remove auth header for future requests
                    setAuthToken(false);
                    // Set current user to {} which will set isAuthenticated to false
                    store.dispatch(setCurrentUser({}));
                    this.props.history.push("/signIn");
                    // Redirect to login
                    // window.location.href = '/signIn';

                } else {
                    // to prevent again and again call to server on every route if user is already set to store
                    if (!user.name){
                        this.props.dispatch(actionCreators.currentUser()).then(response => {
                            console.log(response)
                            // Set auth token header auth
                            setAuthToken(localStorage.jwtToken);
                            //remove loadingBig component
                            this.setState({loadingBig: false})
                            // load route as per authentication
                            this.checkAuth()
                        });
                    }else {
                        //remove loadingBig component
                        this.setState({loadingBig: false})
                        // load route as per authentication
                        this.checkAuth()
                    }

                }
            } else {
                //remove loadingBig component
                this.setState({loadingBig: false})
                // load route as per authentication
                this.checkAuth()
            }


        }

        render() {

            if (this.state.loadingBig) {
                return (
                    <SpinnerBig/>
                )
            }

            return (
                <ComponentToRender {...this.props} />
            );
        }
    }

    function mapStateToProps(state) {
        return {
            user: state.auth.user,
            isAdmin: state.auth.isAdmin,
            isAuthenticated: state.auth.isAuthenticated
        }
    }

    return connect(mapStateToProps)(AuthenticationCheck)
}


