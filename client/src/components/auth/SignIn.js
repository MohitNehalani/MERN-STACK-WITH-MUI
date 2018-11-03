import React from 'react';
import PropTypes from 'prop-types';
import {
    Avatar,
    Button,
    FormControl,
    FormControlLabel,
    Checkbox,
    Input,
    InputLabel,
    Paper,
    Grid,
    Typography
} from '@material-ui/core';
import {LockOpenOutlined} from "@material-ui/icons"
import withStyles from '@material-ui/core/styles/withStyles';
import * as actionCreators from "../../store/actions";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import SpinnerSmall from "../UI/Spinner/SpinnerSmall";
import Link from "react-router-dom/es/Link";
import {styles} from "./AuthStyles"
import {HandleChange, Validation} from "../UI/FormAction/FormActions";

class LoginUser extends React.Component {
    state = {
        completeFormValidity: false,
        contactData: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail',
                },
                value: '',
                label: 'Email Address',
                rules: {
                    required: true,
                    minLength: 7,
                    maxLength: 30,
                    isEmail: true
                },
                isValid: true,
                errorMsg: "REQUIRED!! And should be between 8-30 characters, and include @example.com",
                touched: false,
            },

            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password',
                },
                value: '',
                label: 'Password',
                rules: {
                    required: true,
                    minLength: 6,
                    maxLength: 40
                },
                isValid: true,
                errorMsg: "REQUIRED!! And should be between 7-40 characters",
                touched: false,
            },


        }
    };

    submitFormHandler = (event) => {
        event.preventDefault();

        let userDataFromState = {};
        for (let key in this.state.contactData) {
            userDataFromState[key] = this.state.contactData[key].value;
        }
        this.props.loginUser(userDataFromState, this.props.history)
    };

    checkValidity = (event) => {
        this.setState(Validation(event, this.state))
    };

    onChangehandler = (event) => {
        this.setState(HandleChange(event, this.state));
    };

    render() {
        const {classes} = this.props;
        let spinner;
        if (this.props.loading) {
            spinner = <SpinnerSmall/>
        }
        return (
            <React.Fragment>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOpenOutlined/>
                        </Avatar>
                        <Typography variant="h5">
                            Sign in
                        </Typography>
                        <form onSubmit={(event) => this.submitFormHandler(event)} className={classes.form}>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="email">{this.state.contactData.email.label}</InputLabel>
                                <Input id="email"
                                       onBlur={(e) => this.checkValidity(e)}
                                       onChange={(e) => this.onChangehandler(e)}
                                       value={this.state.contactData.email.value}
                                       placeholder={this.state.contactData.email.elementConfig.placeholder}
                                       name="email"
                                       error={!this.state.contactData.email.isValid && this.state.contactData.email.touched}
                                       autoComplete="email"
                                       autoFocus/>
                                <span className={classes.errMsg}>
                    {
                        !this.state.contactData.email.isValid
                        && this.state.contactData.email.touched
                            ? this.state.contactData.email.errorMsg
                            : null
                    }
                  </span>
                                <span className={classes.errMsg}>
                    {
                        this.props.errors ?
                            this.props.errors.email : null
                    }
                  </span>
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="password">{this.state.contactData.password.label}</InputLabel>
                                <Input
                                    name="password"
                                    onBlur={(e) => this.checkValidity(e)}
                                    onChange={(e) => this.onChangehandler(e)}
                                    value={this.state.contactData.password.value}
                                    placeholder={this.state.contactData.password.elementConfig.placeholder}
                                    error={!this.state.contactData.password.isValid && this.state.contactData.password.touched}
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <span className={classes.errMsg}>
                    {
                        !this.state.contactData.password.isValid
                        && this.state.contactData.password.touched
                            ? this.state.contactData.password.errorMsg
                            : null
                    }
                  </span>
                                <span className={classes.errMsg}>
                    {
                        this.props.errors
                            ? this.props.errors.password
                            : null
                    }
                  </span>
                                <span className={classes.errMsg}>
                    {
                        this.props.errors.incorrectPassword
                            ? this.props.errors.incorrectPassword
                            : null
                    }
                  </span>
                            </FormControl>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="secondary"/>}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                <Grid container>
                                    <Grid item xs={this.props.loading ? 7 : 11}>
                                        Sign in
                                    </Grid>
                                    <Grid item xs={this.props.loading ? 3 : 1}>
                                        {spinner}
                                    </Grid>
                                </Grid>
                            </Button>
                        </form>
                        <div className={classes.linkToRegister}>
                            <p style={{margin: "20px 0 0 0"}}>First time users? </p>
                            <p style={{margin: "0"}}>Please Signup before login</p>
                            <Link to={"/signUp"}><Button
                                variant="contained"
                                color="secondary"
                                className={classes.submit}>Sign
                                up</Button></Link>
                        </div>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }

}

LoginUser.propTypes = {
    classes: PropTypes.object.isRequired,
};

let mapStateToProps = state => {
    return {
        loading: state.loading.loading,
        errors: state.errors
    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (userData, history) => dispatch(actionCreators.loginUser(userData, history))
    }
};
export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginUser)));