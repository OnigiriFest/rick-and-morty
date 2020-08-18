import React from 'react';
import ReactDOM from 'react-dom';
import './tailwind.output.css';
import './style.css';
import { Provider } from 'react-redux';

import generateStore from './redux/store';
import App from './components/App';

const store = generateStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
