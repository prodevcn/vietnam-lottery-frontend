import {applyMiddleware, createStore} from 'redux';
import loggerMiddleware from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducers';

const middleware = applyMiddleware(thunkMiddleware);

export default createStore(reducer, composeWithDevTools(middleware));