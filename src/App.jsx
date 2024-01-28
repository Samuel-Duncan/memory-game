import { useState, useEffect } from 'react';
import { FetchData } from './data/FetchData';
import { Header } from './components/Header';
import { Cards } from './components/Cards';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

  //Fetch data
  useEffect(() => {
    FetchData.getData()
      .then((result) => {
        setCards(result);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // Check if clicked cards has duplicates (game over)
  const hasDuplicates = (array) => {
    return array.length !== new Set(array).size;
  };

  useEffect(() => {
    if (hasDuplicates(clickedCards) && score > bestScore) {
      setBestScore(score - 1);
      setScore(0);
      setClickedCards([]);
      setCards(shuffleCards([...cards]));
    }
  }, [clickedCards]);

  //Shuffle cards
  const shuffleCards = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleCardClick = (cardId) => {
    setScore(score + 1);
    setClickedCards((prevClickedCards) => [...prevClickedCards, cardId]);
    setCards(shuffleCards([...cards]));
  };

  return (
    <>
      <Header score={score} bestScore={bestScore} />
      <Cards data={cards} onClick={handleCardClick}></Cards>
    </>
  );
}

export default App;
