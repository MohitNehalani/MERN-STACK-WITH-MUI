import React from "react";
import {connect} from "react-redux";
import * as actionCreators from "../../store/actions";
import {withRouter} from "react-router-dom";
import {
    Avatar,
    TextField,
    MenuItem,
    Input,
    Button,
    FormControl,
    Grid,
    InputLabel,
    Paper,
    Typography
} from "@material-ui/core";
import {OpenInNew} from "@material-ui/icons";
import Link from "react-router-dom/es/Link";
import withStyles from "../../../node_modules/@material-ui/core/styles/withStyles";
import {styles} from "./AuthStyles"
import SpinnerSmall from "../UI/Spinner/SpinnerSmall";
import {Validation, HandleChange} from "../UI/FormAction/FormActions";


class SignUp extends React.Component {
    state = {
        completeFormValidity: false,
        contactData: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                label: 'Name',
                rules: {
                    required: true,
                    minLength: 4,
                    maxLength: 18
                },
                isValid: true,
                errorMsg: "REQUIRED!! And should be between 4-18 characters",
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail',
                },
                value: '',
                label: 'Email',
                rules: {
                    required: true,
                    minLength: 8,
                    maxLength: 30,
                    isEmail: true
                },
                isValid: true,
                errorMsg: "REQUIRED!! And should be a valid email address",
                touched: false,
            },
            contactNumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Your Contact No.',
                },
                value: '',
                label: 'Contact Number',
                rules: {
                    required: true,
                    minLength: 8,
                    maxLength: 15,
                    isNumeric: true
                },
                isValid: true,
                errorMsg: "REQUIRED!! And should be between 8-15 characters",
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
                errorMsg: "REQUIRED!! And should be between 6-40 characters",
                touched: false,
            },
            password2: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm password',
                },
                value: '',
                label: 'Confirm Password',
                rules: {
                    required: true,
                    confirmPassword: true
                },
                isValid: true,
                errorMsg: "Must be same as above password",
                touched: false,
            },

            registeringAs: {
                elementType: 'select',
                elementConfig: {
                    option: [
                        {value: 'Buyer', displayValue: 'Buyer'},
                        {value: 'Seller', displayValue: 'Seller'},
                    ]
                },
                value: 'Buyer',
                label: 'Registering As',
                touched: false,
                isValid: true,
                rules: {
                    required: false,
                }
            },
        }
    };

    submitFormHandler = (event) => {
        event.preventDefault();

        let userDataFromState = {};
        for (let key in this.state.contactData) {
            userDataFromState[key] = this.state.contactData[key].value;
        }
        this.props.submitUserData(userDataFromState, this.props.history)
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
                            <OpenInNew/>
                        </Avatar>
                        <Typography variant="h5">
                            Sign Up
                        </Typography>
                        <Typography variant='caption'>
                            Please fill form to become a member
                        </Typography>
                        <form onSubmit={(event) => this.submitFormHandler(event)} className={classes.form}>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel
                                    htmlFor={this.state.contactData.name.elementConfig.type}>
                                    {this.state.contactData.name.label}
                                </InputLabel>
                                <Input id="name"
                                       onBlur={(e) => this.checkValidity(e)}
                                       onChange={(e) => this.onChangehandler(e)}
                                       value={this.state.contactData.name.value}
                                       placeholder={this.state.contactData.name.elementConfig.placeholder}
                                       name="name"
                                       error={!this.state.contactData.name.isValid && this.state.contactData.name.touched}
                                       type={this.state.contactData.name.elementConfig.type}
                                       autoComplete="name"
                                       autoFocus/>
                                <span className={classes.errMsg}>
                    {
                        !this.state.contactData.name.isValid
                        && this.state.contactData.name.touched
                            ? this.state.contactData.name.errorMsg
                            : null
                    }
                  </span>
                                <span className={classes.errMsg}>
                    {
                        this.props.errors ?
                            this.props.errors.name : null
                    }
                  </span>
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel
                                    htmlFor={this.state.contactData.email.elementConfig.type}>
                                    {this.state.contactData.email.label}
                                </InputLabel>
                                <Input id="email"
                                       onBlur={(e) => this.checkValidity(e)}
                                       onChange={(e) => this.onChangehandler(e)}
                                       value={this.state.contactData.email.value}
                                       placeholder={this.state.contactData.email.elementConfig.placeholder}
                                       name="email"
                                       error={!this.state.contactData.email.isValid && this.state.contactData.email.touched}
                                       autoComplete="email"
                                       type={this.state.contactData.email.elementConfig.type}
                                />
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
                                <InputLabel
                                    htmlFor={this.state.contactData.contactNumber.elementConfig.type}>
                                    {this.state.contactData.contactNumber.label}
                                </InputLabel>
                                <Input id="contactNumber"
                                       onBlur={(e) => this.checkValidity(e)}
                                       onChange={(e) => this.onChangehandler(e)}
                                       value={this.state.contactData.contactNumber.value}
                                       placeholder={this.state.contactData.contactNumber.elementConfig.placeholder}
                                       name="contactNumber"
                                       error={!this.state.contactData.contactNumber.isValid && this.state.contactData.contactNumber.touched}
                                       autoComplete="contactNumber"
                                       type={this.state.contactData.contactNumber.elementConfig.type}
                                />
                                <span className={classes.errMsg}>
                    {
                        !this.state.contactData.contactNumber.isValid
                        && this.state.contactData.contactNumber.touched
                            ? this.state.contactData.contactNumber.errorMsg
                            : null
                    }
                  </span>
                                <span className={classes.errMsg}>
                    {
                        this.props.errors ?
                            this.props.errors.contactNumber : null
                    }
                  </span>
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel
                                    htmlFor={this.state.contactData.password.elementConfig.type}>{this.state.contactData.password.label}</InputLabel>
                                <Input
                                    name="password"
                                    onBlur={(e) => this.checkValidity(e)}
                                    onChange={(e) => this.onChangehandler(e)}
                                    value={this.state.contactData.password.value}
                                    placeholder={this.state.contactData.password.elementConfig.placeholder}
                                    error={!this.state.contactData.password.isValid && this.state.contactData.password.touched}
                                    type={this.state.contactData.password.elementConfig.type}
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
                            <FormControl margin="normal" fullWidth>
                                <InputLabel
                                    htmlFor={this.state.contactData.password2.elementConfig.type}>{this.state.contactData.password2.label}</InputLabel>
                                <Input
                                    name="password2"
                                    onBlur={(e) => this.checkValidity(e)}
                                    onChange={(e) => this.onChangehandler(e)}
                                    value={this.state.contactData.password2.value}
                                    placeholder={this.state.contactData.password2.elementConfig.placeholder}
                                    error={!this.state.contactData.password2.isValid && this.state.contactData.password2.touched}
                                    type={this.state.contactData.password2.elementConfig.type}
                                    id="password2"
                                    autoComplete="current-password"
                                />
                                <span className={classes.errMsg}>
                    {
                        !this.state.contactData.password2.isValid
                        && this.state.contactData.password2.touched
                            ? this.state.contactData.password2.errorMsg
                            : null
                    }
                  </span>
                                <span className={classes.errMsg}>
                    {
                        this.props.errors
                            ? this.props.errors.password2
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
                            <TextField
                                select
                                onChange={(e) => this.onChangehandler(e)}
                                label={this.state.contactData.registeringAs.label}
                                value={this.state.contactData.registeringAs.value}
                                fullWidth
                                name={'registeringAs'}
                                helperText='Select "SELLER" only if you want to sell your products on this website'
                                margin="normal"
                            >
                                {this.state.contactData.registeringAs.elementConfig.option.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.displayValue.toUpperCase()}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                <Grid container>
                                    <Grid item xs={this.props.loading ? 7 : 11}>
                                        Sign up
                                    </Grid>
                                    <Grid item xs={this.props.loading ? 3 : 1}>
                                        {spinner}
                                    </Grid>
                                </Grid>
                            </Button>
                        </form>
                        <div className={classes.linkToRegister}>
                            <p style={{margin: "20px 0 0 0"}}>Already a member? </p>
                            <p style={{margin: "0"}}>Please proceed with Sign in</p>
                            <Link to={"/signIn"}><Button
                                variant="contained"
                                color="secondary"
                                className={classes.submit}>Sign
                                in</Button></Link>
                        </div>
                    </Paper>
                </main>
            </React.Fragment>
        )
    }
}

let mapStateToProps = state => {
    return {
        errors: state.errors,
        loading: state.loading.loading
    }
};
let mapDispatchToProps = (dispatch) => {
    return {

        submitUserData: (userData, history) => dispatch(actionCreators.registerNewUser(userData, history))
    }
};
export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp)));