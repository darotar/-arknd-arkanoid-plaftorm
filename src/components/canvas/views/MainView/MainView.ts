import { GAME_TOGGLE_KEY } from '../../../../consts';
import { UserEventService } from '../../../../context/services/userEventService';
import { initializeObjects, ObjectsFabric } from './objectsFabric';
import { ArkanoidRenderer } from './renderer';

export class ArkanoidGameView {
  private objFabric: ObjectsFabric;
  private renderer: ArkanoidRenderer;
  private isGameStarted: boolean = false;

  constructor(
    private context: CanvasRenderingContext2D,
    private userEventService: UserEventService
  ) {
    this.objFabric = initializeObjects(
      this.context.canvas,
      this.userEventService
    );
    this.renderer = new ArkanoidRenderer(this.context);

    this.render();

    document.addEventListener('keyup', (event) => this.toggleGame(event.code));
  }

  gameLoop() {
    if (!this.isGameStarted) {
      return;
    }

    this.render();
    this.update();

    requestAnimationFrame(() => this.gameLoop());
  }

  toggleComputer(userName: string) {
    const { panels } = this.objFabric;

    const selectedPanel = panels.find((panel) => panel.name === userName);

    if (selectedPanel) {
      selectedPanel.isComputer = !selectedPanel?.isComputer;

      selectedPanel.isComputer
        ? selectedPanel.removeKeyListeners()
        : selectedPanel.addKeyListeners();
    }
  }

  startGame(): void {
    if (this.isGameStarted) {
      return;
    }

    this.isGameStarted = true;
    this.gameLoop();
  }

  pauseGame(): void {
    this.isGameStarted = false;
  }

  toggleGame(eventCode: string): void {
    if (eventCode === GAME_TOGGLE_KEY) {
      this.isGameStarted ? this.pauseGame() : this.startGame();
    }
  }

  public render() {
    const { ball, panels } = this.objFabric;

    this.renderer.drawBackground();
    this.renderer.drawBall(ball);
    panels.forEach((panel) => this.renderer.drawPanel(panel));
  }

  public update() {
    const { ball, collision, panels } = this.objFabric;

    ball.move();
    panels.forEach((panel) => {
      if (panel.isComputer) {
        panel.moveAutomatically(ball);
      } else {
        panel.move(this.context.canvas);
      }
    });
    collision.checkOnWalls();
    collision.checkOnPanels();
  }
}
