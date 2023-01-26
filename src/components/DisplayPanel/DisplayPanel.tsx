import { FC, useContext } from 'react';
import { GameContext } from '../../context/gameContext';

import { PanelWrapper, UserMeta, UserWrapper } from './DisplayPanel.styles';

export const DisplayPanel: FC = () => {
  const { appView, userEventService } = useContext(GameContext);

  const startGame = () => appView?.startGame();
  const pauseGame = () => appView?.pauseGame();
  const toggleComputer = (userName: string) => () =>
    appView?.toggleComputer(userName);

  return (
    <PanelWrapper>
      <div>
        <button onClick={startGame}>Start Game</button>
        <button onClick={pauseGame}>Pause Game</button>
      </div>
      <UserWrapper>
        {userEventService?.getUsers().map((user) => (
          <UserMeta key={user.name}>
            <p>{user.name}</p>
            <p>Score: {user.score}</p>
            <button onClick={toggleComputer(user.name)}>
              Switch to PC/User
            </button>
          </UserMeta>
        ))}
      </UserWrapper>
    </PanelWrapper>
  );
};
