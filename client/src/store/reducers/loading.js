import * as actionTypes from '../actions/actionTypes';

const initialState = {loading:false};

export default function(state = initialState, action) {
    switch (action.type) {
        case actionTypes.TOOGLE_LOADING:
            return {
                ...state,
                loading:action.payload
            };
        default:
            return state;
    }
}
