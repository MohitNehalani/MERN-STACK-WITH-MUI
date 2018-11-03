import * as actionTypes from '../actions/actionTypes';
import isEmpty from '../../validation/is-empty';

const initialState = {
    isAuthenticated: false,
    isAdmin: false,
    user: {}
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                isAdmin: action.payload.role !== 0 || !isEmpty(action.payload),
                user: action.payload,
            };
        default:
            return state;
    }
};
