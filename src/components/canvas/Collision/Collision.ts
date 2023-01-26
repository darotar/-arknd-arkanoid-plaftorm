import { BALL_SPEED, PANEL_HEIGHT, PANEL_WIDTH } from '../../../consts';
import { UserEventService } from '../../../context/services/userEventService';
import { Ball } from '../Ball';
import { Panel } from '../Panel';

export class Collision {
  constructor(
    private ball: Ball,
    private canvas: HTMLCanvasElement,
    private panels: Panel[],
    private userEventService: UserEventService
  ) {}

  public checkOnWalls(): void {
    this.checkOnScores();

    if (
      this.ball.y - this.ball.centerToEdge < 0 ||
      this.ball.y + this.ball.centerToEdge > this.canvas.height
    ) {
      this.ball.changeYDirection();
    }
  }

  private checkOnScores() {
    let position = '';

    if (this.ball.edges.right < 0) {
      position = 'right';
    } else if (this.ball.edges.left > this.canvas.width) {
      position = 'left';
    }

    if (position) {
      const user = this.panels.find((panel) => panel.side === position);

      !!user && this.userEventService.addScore(user.name);
      this.resetBall();
      this.randomizeBallDirection();
      this.resetPanels();
    }
  }

  public resetBall(): void {
    this.ball.x = this.canvas.width / 2;
    this.ball.y = this.canvas.height / 2;
    this.ball.speed.x = 0;
    this.ball.speed.y = 0;

    setTimeout(() => {
      this.ball.speed.x = BALL_SPEED;
      this.ball.speed.y = BALL_SPEED;
    }, 500);
  }

  public resetPanels(): void {
    this.panels.forEach((panel) => {
      panel.x = panel.side === 'left' ? 0 : this.canvas.width - PANEL_WIDTH;
      panel.y = (this.canvas.height - PANEL_HEIGHT) / 2;
    });
  }

  public randomizeBallDirection(): void {
    this.ball.startingDirection.x = Math.round(Math.random());
    this.ball.startingDirection.y = Math.round(Math.random());
  }

  isBallInsidePanelPosition(panel: Panel): boolean {
    return this.ball.y >= panel.edges.top && this.ball.y <= panel.edges.bottom;
  }

  collidedWithLeftPanel(panel: Panel): boolean {
    const { edges: panelEdges } = panel;

    if (panel.side === 'left') {
      return (
        this.ball.edges.left <= panelEdges.right &&
        this.isBallInsidePanelPosition(panel)
      );
    }

    return false;
  }

  collidedWithRightPanel(panel: Panel): boolean {
    const { edges: panelEdges } = panel;

    if (panel.side === 'right') {
      return (
        this.ball.edges.right >= panelEdges.left &&
        this.isBallInsidePanelPosition(panel)
      );
    }

    return false;
  }

  checkOnPanels(): void {
    this.panels.forEach((panel) => {
      if (
        this.collidedWithLeftPanel(panel) ||
        this.collidedWithRightPanel(panel)
      ) {
        this.ball.changeXDirection();
      }
    });
  }
}
