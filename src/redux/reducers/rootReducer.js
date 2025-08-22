// import { mainReducer } from './mainReducer';
import { persistReducer } from './persistReducer';
import volatileReducer from './volatileReducer';

import { combineReducers } from 'redux';

const rootReducers = combineReducers({
    // mainState: mainReducer,
    persistState: persistReducer,    
    volatileState: volatileReducer
});

export default rootReducers 