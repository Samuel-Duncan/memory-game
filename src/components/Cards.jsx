import { Card } from './Card';
import '../styles/Cards.css';

function Cards({ data }) {
  return (
    <div className="cards">
      {data.map((info) => (
        <Card key={info.id}>
          <img className="card-image" src={info.imageUrl} alt={info.name} />
          <br />
          <strong className="card-title">{info.name}</strong>
        </Card>
      ))}
    </div>
  );
}

export { Cards };
