// 引入React是因为使用了JSX语法，否则会报错
import React from 'react';
import ReactDOM from 'react-dom';

// 引入applyMiddleware是为了可以使用中间件
import { createStore, applyMiddleware, compose } from "redux";
// 通过Provider包装整个应用，使得每个组件都能访问 Redux store
import { Provider } from "react-redux";
import Thunk from "redux-thunk";
import './index.css';
import App from './App';

// PWA，离线使用
import * as serviceWorker from './serviceWorker';
import reducer from "./redux/reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(Thunk))
);

// 每一次调用 dispatch 最终都会调用 reducer！
ReactDOM.render(
    <Provider store={store}>
        <React.Fragment>
            <App/>
        </React.Fragment>
    </Provider>
    ,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
