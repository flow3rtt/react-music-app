import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import {persistStore, persistReducer} from 'redux-persist'
import storageSession from 'redux-persist/lib/storage/session'

const persistConfig = {
    key: 'react-music-qq',
    storage: storageSession,
    whitelist: ['persist']
}

const composeParams = [];
composeParams.push(applyMiddleware(thunk))
// if (window.__REDUX_DEVTOOLS_EXTENSION__) {
//     composeParams.push(window.__REDUX_DEVTOOLS_EXTENSION__())
// }


const persistedReducer = persistReducer(persistConfig, rootReducer);


export default () => {
    let store = createStore(persistedReducer, compose(...composeParams))
    let persistor = persistStore(store)
    return { store, persistor }
}

