import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import FetchData from './data/FetchData.js';
import './index.css';

async function fetchDataAndProcess() {
  try {
    const allData = await FetchData.getAllData();
    console.log(allData); // Do something with the fetched data
  } catch (error) {
    console.error('Error fetching and processing data:', error);
  }
}

fetchDataAndProcess();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
