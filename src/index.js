import React from "react";
import ReactDOM from "react-dom";
import {Router} from "react-router-dom";
import history from "./history";
import constructorStore from './store'
import {Provider} from 'react-redux'
import Layout from "./layout";
import { PersistGate } from 'redux-persist/lib/integration/react'
import 'normalize.css/normalize.css'
import './assets/style/reset.css'
import './assets/style/index.css'
const {store, persistor} = constructorStore();


ReactDOM.render(
    <Provider  store={store}>
        <PersistGate persistor={persistor}>
            <Router history={history}>
                <Layout/>
            </Router>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
);