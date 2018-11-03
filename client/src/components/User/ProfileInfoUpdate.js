import React from "react";
import {connect} from "react-redux";
import * as actionCreators from "../../store/actions";
import {withRouter} from "react-router-dom";
import {
   Avatar,
   Input,
   Button,
   FormControl,
   Grid,
   InputLabel,
   Paper,
   Typography
} from "@material-ui/core";
import {PermContactCalendarOutlined} from "@material-ui/icons";
import withStyles from "../../../node_modules/@material-ui/core/styles/withStyles";
import {styles} from "../auth/AuthStyles"
import SpinnerSmall from "../UI/Spinner/SpinnerSmall";
import {HandleChange, Validation} from "../UI/FormAction/FormActions";


class ProfileInfoUpdate extends React.Component {
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
      }
   };

   componentDidMount() {
      if (this.props.user){
         let updatedState = {
            ...this.state.contactData
         }
         updatedState.name.value = this.props.user.name ? this.props.user.name : "";
         updatedState.email.value = this.props.user.email ? this.props.user.email : "";
         updatedState.contactNumber.value = this.props.user.contactNumber ? this.props.user.contactNumber : "";

         this.setState({contactData: updatedState})
      } else {

      }


   }

   submitFormHandler = (event) => {
      event.preventDefault();

      let userDataFromState = {};
      for (let key in this.state.contactData) {
         userDataFromState[key] = this.state.contactData[key].value;
      }
      this.props.updateUserData(userDataFromState, this.props.history)
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
             <main style={{width:'100%'}} className={classes.layout}>
                <Paper  style={{width:'100%', marginTop:'0'}} className={classes.paper}>
                   <Avatar className={classes.avatar}>
                      <PermContactCalendarOutlined/>
                   </Avatar>
                   <Typography variant="h4">
                      <b>Profile</b>
                   </Typography>
                   <Typography variant='subtitle1'>
                      Please fill form to update your profile info
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
                      <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                      >
                         <Grid container>
                            <Grid item xs={this.props.loading ? 7 : 11}>
                               Update
                            </Grid>
                            <Grid item xs={this.props.loading ? 3 : 1}>
                               {spinner}
                            </Grid>
                         </Grid>
                      </Button>
                   </form>
                </Paper>
             </main>
          </React.Fragment>
      )
   }
}

let mapStateToProps = state => {
   return {
      errors: state.errors,
      loading: state.loading.loading,
      user: state.auth.user
   }
};
let mapDispatchToProps = (dispatch) => {
   return {

      updateUserData: (userData, history) => dispatch(actionCreators.updateUserData(userData, history))
   }
};
export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileInfoUpdate)));