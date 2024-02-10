import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '../components/Modal';

describe('Modal', () => {
  it('should render a button with the text "Play again"', () => {
    render(<Modal onClick={() => {}} />);
    const button = screen.getByRole('button', { name: 'Play again' });
    expect(button).toBeInTheDocument();
  });

  it('should call the onClick function when clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Modal onClick={onClick} />);
    const button = screen.getByRole('button', { name: 'Play again' });

    await user.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it("should not call the onClick function when it isn't clicked", async () => {
    const onClick = vi.fn();
    render(<Modal onClick={onClick} />);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('should display "You won!" if isGameWon is true', () => {
    render(<Modal onClick={() => {}} isGameWon={true} />);
    const message = screen.getByRole('heading');
    expect(message).toHaveTextContent('You won!');
  });

  it('should display "Game over" if isGameWon is false', () => {
    render(<Modal onClick={() => {}} isGameWon={false} />);
    const message = screen.getByRole('heading');
    expect(message).toHaveTextContent('Game over');
  });
});
