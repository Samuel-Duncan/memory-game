import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import FetchData from './data/FetchData.js';
import './index.css';

FetchData.getData();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
