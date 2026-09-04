// Analytics placeholder for Cocos
export default class Analytics {
  static event(name: string, props?: Record<string, any>) {
    console.log('[Analytics]', name, props || {});
  }
}
