// Simplified GameManager for Cocos Creator (TypeScript)
// Path: assets/scripts/core/GameManager.ts

export enum GameState {
  MENU = 'MENU',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  GAMEOVER = 'GAMEOVER',
}

export default class GameManager {
  private static _instance: GameManager;
  public state: GameState = GameState.MENU;
  public score: number = 0;

  static instance() {
    if (!GameManager._instance) GameManager._instance = new GameManager();
    return GameManager._instance;
  }

  startGame() {
    this.score = 0;
    this.state = GameState.PLAYING;
    // Analytics.event('game_start');
  }

  endGame() {
    this.state = GameState.GAMEOVER;
    // Analytics.event('game_over', { score: this.score });
    // AdManager.instance().showInterstitial();
  }

  reviveByAd(onSuccess: () => void, onFail?: () => void) {
    // AdManager.instance().showRewardedVideo((granted) => {
    //   if (granted) onSuccess(); else if (onFail) onFail();
    // });
  }

  addScore(delta: number) {
    this.score += delta;
    // Analytics.event('score_add', { delta, score: this.score });
  }
}
