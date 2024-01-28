import '../styles/Modal.css';

const Modal = ({ onClose, isGameWon }) => {
  return (
    <div className={'modal-backdrop'}>
      <div className="modal">
        <h1>{isGameWon ? 'You won!' : 'Game over'}</h1>
        <button onClick={onClose}>Play again</button>
      </div>
    </div>
  );
};

export { Modal };
