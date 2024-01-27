import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { FetchData } from './data/FetchData';
import { Header } from './components/Header';
import { Cards } from './components/Cards';
import './App.css';

function App() {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    FetchData.getData()
      .then((result) => {
        setCardData(result);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <>
      <Header />
      <Cards data={cardData}></Cards>
    </>
  );
}

export default App;
