import '../styles/Cards.css';

function Cards({ data, onClick }) {
  return (
    <div className="cards" onClick={onClick}>
      {data.map((info) => (
        <Card key={info.id}>
          <div className="wrapper">
            <img className="game-image" src={info.imageUrl} alt={info.name} />
            <h2>{info.name}</h2>
          </div>
        </Card>
      ))}
    </div>
  );
}

function Card({ children }) {
  return <div className="card">{children}</div>;
}

export { Cards };
