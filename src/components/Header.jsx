import '../styles/Header.css';

function Header({ score, bestScore }) {
  return (
    <header className="header">
      <div className="header-left">
        <h1>RPG Memory Game</h1>
      </div>
      <div className="header-right">
        <span>Score: {score}</span>
        <span>Best score: {bestScore}</span>
      </div>
    </header>
  );
}

export { Header };
