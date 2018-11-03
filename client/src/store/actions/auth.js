import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import * as actionTypes from './actionTypes';


//set current user --- check for token in local storage if not exepired then load user from server
// we are using redux-promise so that we can call .then() inside Authentication.js
export const currentUser = () => {

   const request = axios.get('/api/users/current')
       .then(response => response.data.user)
    return{
       type:actionTypes.SET_CURRENT_USER,
        payload: request
    }
}

// Register User
export const registerNewUser = (userData, history) => dispatch => {
   dispatch(loading(true));
   dispatch(clearErrors())
   axios
       .post('/api/users/register', userData)
       .then(res => {
          history.push('/signIn')
          dispatch(loading(false));

       })
       .catch(err => {
              console.log(err.response.data);
              dispatch(getErrors(err.response.data));
              dispatch(loading(false));

              setTimeout(() => dispatch(clearErrors()), 8000)
           }
       );
};
export const updateUserData = (userData, history) => dispatch => {
   dispatch(loading(true));
   dispatch(clearErrors())
   axios
       .post('/api/users/update_profile', userData)
       .then(res => {
          dispatch(loading(false));
          dispatch(setCurrentUser(res.data.user));
          dispatch(loading(false));
       })
       .catch(err => {
              console.log(err.response.data);
              dispatch(getErrors(err.response.data));
              dispatch(loading(false));
              setTimeout(() => dispatch(clearErrors()), 8000)
           }
       );
};

// Login - Get User Token
export const loginUser = (userData, history) => dispatch => {
   dispatch(loading(true));
   dispatch(clearErrors())

   axios
       .post('/api/users/login', userData)
       .then(res => {
          // Save to localStorage
          const {token} = res.data.user;
          // Set token to ls
          localStorage.setItem('jwtToken', token);
          // Set token to Auth header to send as default with every request ..once user is logged in
          setAuthToken(token);
          // Decode token to get user data
          const decodedToken = jwt_decode(token);
          //set token info to our user data
          res.data.user.decocodedToken = decodedToken;
          // Set current user
          dispatch(setCurrentUser(res.data.user));
          history.push("/");
          dispatch(loading(false));

       })
       .catch(err => {
          dispatch(getErrors(err.response.data));
          dispatch(loading(false));

          setTimeout(() => dispatch(clearErrors()), 8000)
       })
};
export const clearErrors = () => {
   return {
      type: actionTypes.CLEAR_ERRORS
   }
}
export const getErrors = (errors) => {
   return {
      type: actionTypes.GET_ERRORS,
      payload: errors
   }
}
export const loading = (toogle) => {
   return {
      type: actionTypes.TOOGLE_LOADING,
      payload: toogle
   }
}
// Set logged in user
export const setCurrentUser = user => {
   return {
      type: actionTypes.SET_CURRENT_USER,
      payload: user
   };
};

// Log user out
// sending id is not required
export const logoutUser = (history) => dispatch => {
   dispatch(loading(true));

   axios.get("/api/users/logout").then(res => {
      // Remove token from localStorage
      localStorage.removeItem('jwtToken');
      // Remove auth header for future requests
      setAuthToken(false);
      // Set current user to {} which will set isAuthenticated to false
      dispatch(setCurrentUser({}));
      history.push("/signIn");
      dispatch(clearErrors());
      dispatch(loading(false));

   })
       .catch(err => {
          dispatch(loading(false));
          console.log(err)
       })

};
