// Simple PlayerController (TypeScript)
// Path: assets/scripts/gameplay/PlayerController.ts

export default class PlayerController {
  private isAlive = true;

  constructor() {
    this.registerInput();
  }

  registerInput() {
    // In Cocos Creator you would bind to node events or cc.systemEvent
    // Example pseudocode:
    // cc.Canvas.instance.node.on('touchstart', () => this.onTap());
  }

  onTap() {
    if (!this.isAlive) return;
    // trigger jump/animation
    // GameManager.instance().addScore(1);
  }

  die() {
    this.isAlive = false;
    // GameManager.instance().endGame();
  }

  revive() {
    this.isAlive = true;
    // reset position
  }
}
