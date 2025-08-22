import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk'
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers/rootReducer';


const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = applyMiddleware(thunk)(createStore)(persistedReducer)

let persistor = persistStore(store);

export {store, persistor} 