import { Ball } from '../../Ball';
import { Collision } from '../../Collision';
import { Panel } from '../../Panel';
import { PANEL_HEIGHT, PANEL_WIDTH } from '../../../../consts';
import { UserEventService } from '../../../../context/services/userEventService';

export type ObjectsFabric = {
  ball: Ball;
  panels: Panel[];
  collision: Collision;
};

export function initializeObjects(
  canvas: HTMLCanvasElement,
  userEventService: UserEventService
): ObjectsFabric {
  const ball = new Ball(canvas.width / 2, canvas.height / 2);

  const panels = userEventService
    .getUsers()
    .map(
      (user) =>
        new Panel(
          user.position === 'left' ? 0 : canvas.width - PANEL_WIDTH,
          (canvas.height - PANEL_HEIGHT) / 2,
          user.color,
          user.isComputer,
          user.score,
          user.keys,
          user.name,
          user.position
        )
    );

  const collision = new Collision(ball, canvas, panels, userEventService);

  return { ball, panels, collision };
}
