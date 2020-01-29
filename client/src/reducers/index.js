import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import places from './places';
import comments from './comments';

const rootReducer = combineReducers({ places, comments, routing: routerReducer });

export default rootReducer;