// AdManager placeholder (TypeScript)
// Path: assets/scripts/services/AdManager.ts

type RewardCallback = (granted: boolean) => void;

export default class AdManager {
  private static _instance: AdManager;
  private rewardAdId = 'WX_REWARD_AD_UNIT_ID';
  private interstitialAdId = 'WX_INTERSTITIAL_AD_UNIT_ID';

  static instance() {
    if (!AdManager._instance) AdManager._instance = new AdManager();
    return AdManager._instance;
  }

  showRewardedVideo(cb: RewardCallback) {
    if ((window as any).wx) {
      // implement real wx ad logic
    } else {
      console.log('Non-wechat environment: simulate reward granted');
      cb(true);
    }
  }

  showInterstitial() {
    if ((window as any).wx) {
      // implement real interstitial logic
    } else {
      console.log('Non-wechat environment: simulate interstitial');
    }
  }
}
