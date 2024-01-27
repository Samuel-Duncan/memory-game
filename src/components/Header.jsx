import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h1>RPG Memory Game</h1>
      </div>
      <div className="header-right">
        <span>Score: 0</span>
        <span>Best score: 0</span>
      </div>
    </header>
  );
}

export { Header };
