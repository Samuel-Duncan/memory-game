import '../styles/Modal.css';

const Modal = ({ onClose, isHidden }) => {
  return (
    <div className={isHidden ? 'modal-backdrop' : 'modal-backdrop hidden'}>
      <div className="modal">
        <h1>Game over</h1>
        <button onClick={onClose}>Play again</button>
      </div>
    </div>
  );
};

export { Modal };
