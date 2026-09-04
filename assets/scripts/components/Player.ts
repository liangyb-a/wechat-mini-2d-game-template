import { _decorator, Component, Node, EventTouch, Collider2D, BoxCollider2D, ICollisionEvent, Vec3 } from 'cc';
import GameManager from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Player')
export default class Player extends Component {
  private isAlive = true;
  private jumpHeight = 120;

  onLoad() {
    // enable input
    this.node.on(Node.EventType.TOUCH_START, this.onTap, this);
  }

  onTap() {
    if (!this.isAlive) return;
    // simple tween-like jump (move up then down)
    const orig = this.node.position.clone();
    this.node.setPosition(orig.x, orig.y + this.jumpHeight, orig.z);
    setTimeout(() => {
      if (!this.node) return;
      this.node.setPosition(orig);
    }, 140);
  }

  onCollisionEnter(event: ICollisionEvent) {
    // if collides with obstacle, die
    this.die();
  }

  die() {
    if (!this.isAlive) return;
    this.isAlive = false;
    GameManager.instance().endGame();
  }

  revive() {
    this.isAlive = true;
    // reset position
    this.node.setPosition(-200, 0, 0);
  }
}
