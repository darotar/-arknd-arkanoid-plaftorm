import { Ball } from '../../components/Ball';
import { Panel } from '../../components/Panel';
import { BACKGROUND_COLOR } from '../../consts';

export class ArkanoidRenderer {
  constructor(private context: CanvasRenderingContext2D) {}

  public drawPanel(panel: Panel) {
    this.context.fillStyle = panel.color;
    this.context.fillRect(panel.x, panel.y, panel.width, panel.height);
  }

  public drawBall(ball: Ball) {
    this.context.strokeStyle = ball.strokeColor;
    this.context.lineWidth = ball.strokeWidth;
    this.context.fillStyle = ball.fillColor;
    this.context.beginPath();
    this.context.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    this.context.stroke();
    this.context.fill();
  }

  public drawBackground() {
    this.context.fillStyle = BACKGROUND_COLOR;
    this.context.fillRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );
  }
}
