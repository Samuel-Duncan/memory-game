import '../styles/Cards.css';

function Cards({ data, onClick }) {
  return (
    <div className="cards">
      {data.map((info) => (
        <Card key={info.id} onClick={() => onClick(info.id)}>
          <div className="wrapper">
            <img className="game-image" src={info.imageUrl} alt={info.name} />
            <h2>{info.name}</h2>
          </div>
        </Card>
      ))}
    </div>
  );
}

function Card({ children, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      {children}
    </div>
  );
}

export { Cards };
