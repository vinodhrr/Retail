import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import login from './Stores/Reducers/login'
import axios from 'axios'

const rootReducer = createStore(login)

axios.interceptors.request.use(request=>{
  console.log("request from request interceptors",request)
  return request
},error=>{
  console.log("error captured from request interceptors", error)
  return Promise.reject(error)
})

axios.interceptors.response.use(response=>{
  console.log("response from response interceptors",response)
  return response
},error=>{
  console.log("error captured from response interceptors", error)
  return Promise.reject(error)
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={rootReducer}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
