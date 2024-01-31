import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { FetchData } from '../data/FetchData';
import App from '../App';

test('modal displays correct message depending on game outcome', async () => {
  // Mock the data that would be fetched asynchronously
  const mockedGameData = [
    {
      id: 3498,
      name: 'Grand Theft Auto V',
      imageUrl:
        'https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg',
    },
    {
      id: 3328,
      name: 'The Witcher 3: Wild Hunt',
      imageUrl:
        'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg',
    },
    {
      id: 28,
      name: 'Red Dead Redemption 2',
      imageUrl:
        'https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg',
    },
    {
      id: 41494,
      name: 'Cyberpunk 2077',
      imageUrl:
        'https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg',
    },
    {
      id: 290856,
      name: 'Apex Legends',
      imageUrl:
        'https://media.rawg.io/media/games/737/737ea5662211d2e0bbd6f5989189e4f1.jpg',
    },
    {
      id: 3387,
      name: 'Bloodborne',
      imageUrl:
        'https://media.rawg.io/media/games/214/214b29aeff13a0ae6a70fc4426e85991.jpg',
    },
    {
      id: 28568,
      name: "Assassin's Creed II",
      imageUrl:
        'https://media.rawg.io/media/games/1be/1bed7fae69d1004c09dfe1101d5a3a94.jpg',
    },
    {
      id: 2093,
      name: "No Man's Sky",
      imageUrl:
        'https://media.rawg.io/media/games/174/1743b3dd185bda4a7be349347d4064df.jpg',
    },
    {
      id: 3497,
      name: 'Far Cry 4',
      imageUrl:
        'https://media.rawg.io/media/games/b39/b396dac1f3e0f538841aa0355dd066d3.jpg',
    },
    {
      id: 326243,
      name: 'Elden Ring',
      imageUrl:
        'https://media.rawg.io/media/games/b29/b294fdd866dcdb643e7bab370a552855.jpg',
    },
    {
      id: 857,
      name: 'Halo: The Master Chief Collection',
      imageUrl:
        'https://media.rawg.io/media/games/c24/c24f4434882ae9c2c8d9d38de82cb7a5.jpg',
    },
    {
      id: 28199,
      name: 'Ori and the Will of the Wisps',
      imageUrl:
        'https://media.rawg.io/media/games/718/71891d2484a592d871e91dc826707e1c.jpg',
    },
  ];

  const originalGetData = FetchData.getData;

  // Mock the FetchData.getData() method to return a resolved Promise with the mocked game data
  FetchData.getData = () => Promise.resolve(mockedGameData);

  // Render the App component
  render(<App />);

  // Wait for the data to be rendered
  await waitFor(() => screen.getByText('Grand Theft Auto V'));

  // Simulate playing the game
  for (const item of mockedGameData) {
    userEvent.click(screen.getByText(item.name));
  }

  // Wait for modal to appear
  await waitFor(() => screen.getByText('You won!'));

  // Ensure modal displays the correct message for game won
  expect(screen.getByText('You won!')).toBeInTheDocument();

  // Restore the original implementation of FetchData.getData
  FetchData.getData = originalGetData;
});
