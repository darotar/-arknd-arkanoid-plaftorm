import { FC, useRef, useEffect, useContext } from 'react';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from '../../consts';

import { GameContext } from '../../context/gameContext';
import { ArkanoidGameView } from '../../views/MainView';

export const CanvasContainer: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setAppView, userEventService, appView } = useContext(GameContext);

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');

      if (context && userEventService && !appView) {
        setAppView(new ArkanoidGameView(context, userEventService));
      }
    }
  }, [setAppView, userEventService, appView]);

  return <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />;
};
