import { useState, useEffect } from 'react';
import { FetchData } from './data/FetchData';
import { Header } from './components/Header';
import { Cards } from './components/Cards';
import { Modal } from './components/Modal';
import './App.css';

const getData = () => {
  const [cards, setCards] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  //Fetch data
  useEffect(() => {
    FetchData.getData()
      .then((result) => {
        if (result.status >= 400) {
          throw new Error('server error');
        }
        setCards(result);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return { cards, error, loading };
};

function App() {
  const { cards, error, loading } = getData();
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  // Check if clicked cards has duplicates (game over)
  useEffect(() => {
    if (hasDuplicates(clickedCards) || clickedCards.length === 12) {
      handleGameOver();
    }
  }, [clickedCards]);

  const hasDuplicates = (array) => {
    return array.length !== new Set(array).size;
  };

  // Handle Game Over
  const handleGameOver = () => {
    setScore(0);
    setClickedCards([]);
    setIsGameOver(true);

    if (score === 12) {
      setIsGameWon(true);
    }

    if (score > bestScore) {
      setBestScore(score);
    }
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
    if (hasDuplicates([...clickedCards, cardId]) || score === 12) {
      handleGameOver();
    } else {
      setScore(score + 1);
      setClickedCards((prevClickedCards) => [...prevClickedCards, cardId]);
      setCards(shuffleCards([...cards]));
    }
  };

  const handlePlayAgainClick = () => {
    setIsGameOver(false);
    setIsGameWon(false);
  };

  if (error) return <p>A network error was encountered</p>;
  if (loading)
    return (
      <>
        <Header score={score} bestScore={bestScore} />
        <h2 className="loading">Loading...</h2>
      </>
    );

  return (
    <>
      <Header score={score} bestScore={bestScore} />
      <Cards data={cards} onClick={handleCardClick}></Cards>
      {(isGameOver || isGameWon) && (
        <Modal onClick={handlePlayAgainClick} isGameWon={isGameWon} />
      )}
    </>
  );
}

export default App;
