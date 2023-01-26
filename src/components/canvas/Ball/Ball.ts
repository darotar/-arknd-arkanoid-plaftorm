import {
  BALL_FILL_COLOR,
  BALL_SIZE,
  BALL_SPEED,
  BALL_STROKE_COLOR,
  BALL_STROKE_WIDTH,
} from '../../../consts';
import { ObjectEdges } from '../../../types';

type Vector = { x: number; y: number };

function getDirectionMovement(pos: number, direction: number, speed: number) {
  return direction > 0 ? pos + speed : pos - speed;
}

export class Ball {
  public startingDirection: Vector = { x: 1, y: 1 };

  constructor(
    public x: number,
    public y: number,
    public readonly fillColor: string = BALL_FILL_COLOR,
    public readonly strokeColor: string = BALL_STROKE_COLOR,
    public speed: Vector = { x: BALL_SPEED, y: BALL_SPEED },
    public readonly radius = BALL_SIZE,
    public readonly strokeWidth = BALL_STROKE_WIDTH
  ) {}

  get centerToEdge(): number {
    return this.radius + this.strokeWidth;
  }

  get edges(): ObjectEdges {
    return {
      top: this.y - this.centerToEdge,
      bottom: this.y + this.centerToEdge,
      left: this.x - this.centerToEdge,
      right: this.x + this.centerToEdge,
    };
  }

  public move(): void {
    this.x = getDirectionMovement(
      this.x,
      this.startingDirection.x,
      this.speed.x
    );

    this.y = getDirectionMovement(
      this.y,
      this.startingDirection.y,
      this.speed.y
    );
  }

  public changeYDirection(): void {
    this.speed.y = -this.speed.y;
  }

  public changeXDirection(): void {
    this.speed.x = -this.speed.x;
  }
}
