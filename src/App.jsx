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

  const shuffleData = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const cardOnClick = () => {
    const nextCardData = [...cardData];
    setCardData(shuffleData(nextCardData));
  };

  return (
    <>
      <Header />
      <Cards data={cardData} onClick={cardOnClick}></Cards>
    </>
  );
}

export default App;
