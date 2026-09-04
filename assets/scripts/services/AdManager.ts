// AdManager for Cocos Creator demo (simulated outside WeChat)

type RewardCallback = (granted: boolean) => void;

export default class AdManager {
  private static _instance: AdManager | null = null;
  private rewardAdId = 'WX_REWARD_AD_UNIT_ID';
  private interstitialAdId = 'WX_INTERSTITIAL_AD_UNIT_ID';

  static instance() {
    if (!AdManager._instance) AdManager._instance = new AdManager();
    return AdManager._instance;
  }

  showRewardedVideo(cb: RewardCallback) {
    if ((window as any).wx && (window as any).wx.createRewardedVideoAd) {
      const wx = (window as any).wx;
      const reward = wx.createRewardedVideoAd({ adUnitId: this.rewardAdId });
      reward.onClose((res: any) => {
        const granted = res && (res.isEnded || res === undefined);
        cb(!!granted);
      });
      reward.onError(() => cb(false));
      reward.show().catch(() => reward.load().then(() => reward.show()).catch(() => cb(false)));
    } else {
      // simulate ad in editor / browser
      console.log('[AdManager] Simulate reward ad -> granted');
      setTimeout(() => cb(true), 800);
    }
  }

  showInterstitial() {
    if ((window as any).wx && (window as any).wx.createInterstitialAd) {
      const wx = (window as any).wx;
      const iad = wx.createInterstitialAd({ adUnitId: this.interstitialAdId });
      iad.show().catch((err: any) => console.warn('interstitial show failed', err));
    } else {
      console.log('[AdManager] Simulate interstitial ad');
    }
  }
}
