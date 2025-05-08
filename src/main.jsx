import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ from 'react-dom/client' instead of 'react-dom'
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
