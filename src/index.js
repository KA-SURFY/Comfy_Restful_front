import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// 리덕스 적용하기
import {Provider} from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import rootReducer from './modules';
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

if (process.env.NODE_ENV === "production") {
  console.log = function no_console() {};
  console.warn = function no_console() {};
  console.error = function no_console(){};
}
if (process.env.NODE_ENV === "development") {
  console.log = () => {};
  console.error = () => {};
  console.debug = () => {};
}
console.warn = function () {};

Sentry.init({
  // 모든환경에 설정할 경우
  dsn: "https://3221303bebea4051b86c9ae110da7df5@o4504168621604864.ingest.sentry.io/4504168751169536", 
  integrations: [new Integrations.BrowserTracing()],
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

const store=createStore(rootReducer);
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);
console.log(store.getState());
ReactDOM.render(
  // React 가상 DOM 트리
  <Provider
    store={createStoreWithMiddleware(rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
      )}>
        <App/>
  </Provider>,
  // 실제 DOM 요소 → 루트 DOM 컨테이너
  document.getElementById('root')
);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
