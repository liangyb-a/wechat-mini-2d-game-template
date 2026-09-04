import { _decorator, Component, Node, Label, find } from 'cc';
import GameManager from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('UIManager')
export default class UIManager extends Component {
  @property({ type: Label })
  public scoreLabel: Label | null = null;

  @property({ type: Node })
  public mainMenu: Node | null = null;

  @property({ type: Node })
  public gameOverNode: Node | null = null;

  @property({ type: Node })
  public reviveButton: Node | null = null;

  start() {
    // wire buttons if present
    if (this.mainMenu) {
      const btn = this.mainMenu.getComponentInChildren(Node as any);
    }
  }

  showMainMenu() {
    if (this.mainMenu) this.mainMenu.active = true;
    if (this.gameOverNode) this.gameOverNode.active = false;
  }

  showHUD(score: number) {
    if (this.scoreLabel) this.scoreLabel.string = `Score: ${score}`;
    if (this.mainMenu) this.mainMenu.active = false;
  }

  showGameOver(score: number, onRevive: () => void) {
    if (this.gameOverNode) this.gameOverNode.active = true;
    if (this.scoreLabel) this.scoreLabel.string = `Score: ${score}`;

    if (this.reviveButton) {
      this.reviveButton.on(Node.EventType.TOUCH_END, () => {
        onRevive();
        if (this.gameOverNode) this.gameOverNode.active = false;
      });
    }
  }
}
