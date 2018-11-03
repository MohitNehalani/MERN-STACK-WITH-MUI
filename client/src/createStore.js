import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import authReducer from "./store/reducers/auth";
import thunk from "redux-thunk";
import promiseMiddleware from 'redux-promise';
import errorsReducer from "./store/reducers/errorReducer";
import loading from "./store/reducers/loading";

const initialState = {};

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    errors: errorsReducer,
    loading
});

const store = createStore(rootReducer,initialState, composeEnhancers(
    applyMiddleware(thunk,promiseMiddleware)
));
export default store;