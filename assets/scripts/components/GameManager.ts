import { _decorator, Component, Node, Prefab, instantiate, Vec3, math, Label, CCFloat } from 'cc';
import AdManager from '../services/AdManager';
import UIManager from './UIManager';
import ObjectPool from './ObjectPool';
const { ccclass, property } = _decorator;

export enum GameState {
  MENU = 'MENU',
  PLAYING = 'PLAYING',
  GAMEOVER = 'GAMEOVER',
}

@ccclass('GameManager')
export default class GameManager extends Component {
  private static _instance: GameManager | null = null;
  public state: GameState = GameState.MENU;
  public score = 0;

  @property({ type: Prefab })
  public playerPrefab: Prefab | null = null;

  @property({ type: Prefab })
  public obstaclePrefab: Prefab | null = null;

  @property({ type: Node })
  public spawnRoot: Node | null = null;

  @property({ type: UIManager })
  public uiManager: UIManager | null = null;

  @property({ type: ObjectPool })
  public obstaclePool: ObjectPool | null = null;

  @property({ type: CCFloat })
  public spawnInterval = 0.9;

  @property({ type: CCFloat })
  public obstacleSpeed = 150; // px per second

  private spawnTimer = 0;

  onLoad() {
    GameManager._instance = this;
  }

  start() {
    this.reset();
  }

  public static instance() {
    return GameManager._instance!;
  }

  reset() {
    this.score = 0;
    this.state = GameState.MENU;
    if (this.uiManager) this.uiManager.showMainMenu();
  }

  startGame() {
    this.score = 0;
    this.state = GameState.PLAYING;
    this.spawnTimer = 0;
    if (this.uiManager) this.uiManager.showHUD(0);
  }

  endGame() {
    this.state = GameState.GAMEOVER;
    if (this.uiManager) this.uiManager.showGameOver(this.score, this.reviveByAd.bind(this));
    // show interstitial
    AdManager.instance().showInterstitial();
  }

  reviveByAd(onSuccess: () => void, onFail?: () => void) {
    AdManager.instance().showRewardedVideo((granted) => {
      if (granted) {
        // revive: reduce score a bit and continue
        this.score = Math.max(0, this.score - 5);
        this.state = GameState.PLAYING;
        if (this.uiManager) this.uiManager.showHUD(this.score);
        if (onSuccess) onSuccess();
      } else {
        if (onFail) onFail();
      }
    });
  }

  update(deltaTime: number) {
    if (this.state !== GameState.PLAYING) return;
    this.spawnTimer += deltaTime;
    if (this.spawnTimer >= this.spawnInterval) {
      this.spawnTimer = 0;
      this.spawnObstacle();
    }

    // move obstacles
    if (this.spawnRoot) {
      const children = this.spawnRoot.children.slice();
      for (const c of children) {
        c.setPosition(c.position.x - this.obstacleSpeed * deltaTime, c.position.y, c.position.z);
        // if offscreen (x < -500) recycle
        if (c.position.x < -500) {
          this.recycleObstacle(c);
          this.addScore(1);
        }
      }
    }
  }

  spawnObstacle() {
    if (!this.obstaclePool || !this.spawnRoot || !this.obstaclePrefab) return;
    const node = this.obstaclePool.get(this.obstaclePrefab);
    const y = math.randomRange(-150, 160);
    node.setPosition(400, y, 0);
    this.spawnRoot.addChild(node);
  }

  recycleObstacle(node: Node) {
    if (!this.obstaclePool) return;
    node.removeFromParent();
    this.obstaclePool.put(node);
  }

  addScore(delta: number) {
    this.score += delta;
    if (this.uiManager) this.uiManager.showHUD(this.score);
  }
}
