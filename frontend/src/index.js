import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import { /*jwtInterceptor,*/ errorInterceptor } from './helpers/interceptors';

//jwtInterceptor();
errorInterceptor();

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);