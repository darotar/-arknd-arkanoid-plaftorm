import { PANEL_HEIGHT, PANEL_SPEED, PANEL_WIDTH } from '../../../consts';
import { ObjectEdges, UserKeys } from '../../../types';
import { Ball } from '../Ball';

export class Panel {
  private keyStates: Record<string, boolean> = {};

  constructor(
    public x: number,
    public y: number,
    public readonly color: string,
    public isComputer: boolean,
    public score: number = 0,
    private keys: UserKeys,
    public readonly name: string,
    public readonly side: string,
    public width: number = PANEL_WIDTH,
    public readonly height: number = PANEL_HEIGHT,
    private speed: number = PANEL_SPEED
  ) {
    if (!this.isComputer) {
      this.addKeyListeners();
    }
  }

  get edges(): ObjectEdges {
    return {
      top: this.y,
      bottom: this.y + this.height,
      left: this.x,
      right: this.x + this.width,
    };
  }

  addKeyListeners() {
    document.addEventListener('keydown', (event: KeyboardEvent) =>
      this.toggleKeyMovement(event.key, true)
    );

    document.addEventListener('keyup', (event: KeyboardEvent) =>
      this.toggleKeyMovement(event.key, false)
    );
  }

  removeKeyListeners() {
    document.removeEventListener('keydown', (event: KeyboardEvent) =>
      this.toggleKeyMovement(event.key, true)
    );

    document.removeEventListener('keyup', (event: KeyboardEvent) =>
      this.toggleKeyMovement(event.key, false)
    );
  }

  toggleKeyMovement(key: string, state: boolean) {
    switch (key) {
      case this.keys.up:
        this.keyStates.up = state;
        break;
      case this.keys.down:
        this.keyStates.down = state;
        break;
    }
  }

  move(canvas: HTMLCanvasElement) {
    switch (true) {
      case this.keyStates.up:
        this.y = this.edges.top <= 0 ? this.y : this.y - PANEL_SPEED;
        break;
      case this.keyStates.down:
        this.y =
          this.edges.bottom >= canvas.height ? this.y : this.y + PANEL_SPEED;
        break;
    }
  }

  moveAutomatically(ball: Ball) {
    this.y += (ball.y - (this.y + this.height / 2)) * 0.1;
  }
}
