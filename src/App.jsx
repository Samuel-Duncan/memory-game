import { useState, useEffect } from 'react';
import { FetchData } from './data/FetchData';
import { Header } from './components/Header';
import { Cards } from './components/Cards';
import { Modal } from './components/Modal';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

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
  useEffect(() => {
    if (hasDuplicates(clickedCards)) {
      setScore(0);
      setClickedCards([]);
      setCards(shuffleCards([...cards]));
      setIsGameOver(true);

      if (score > bestScore) {
        setBestScore(score - 1);
      }
    }
  }, [clickedCards]);

  const hasDuplicates = (array) => {
    return array.length !== new Set(array).size;
  };

  //Shuffle cards
  const shuffleCards = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleCardClick = (cardId) => {
    const newScore = score + 1;
    if (hasDuplicates([...clickedCards, cardId])) {
      setScore(0);
      setClickedCards([]);
      setCards(shuffleCards([...cards]));
      setIsGameOver(true);
      if (newScore > bestScore) {
        setBestScore(newScore - 1);
      }
    } else {
      setScore(newScore);
      setClickedCards((prevClickedCards) => [...prevClickedCards, cardId]);
      setCards(shuffleCards([...cards]));
    }
  };

  const handlePlayAgainClick = (e) => {
    e.stopPropagation();
    setIsGameOver(false);
  };

  return (
    <>
      <Header score={score} bestScore={bestScore} />
      <Cards data={cards} onClick={handleCardClick}></Cards>
      <Modal onClose={handlePlayAgainClick} isHidden={isGameOver} />
    </>
  );
}

export default App;
