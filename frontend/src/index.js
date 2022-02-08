import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { jwInterceptor, errorInterceptor } from './helpers/interceptors';

jwInterceptor();
errorInterceptor();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);