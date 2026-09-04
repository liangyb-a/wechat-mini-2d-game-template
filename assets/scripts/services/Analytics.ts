// Analytics placeholder (TypeScript)
// Path: assets/scripts/services/Analytics.ts

export default class Analytics {
  static event(name: string, props?: Record<string, any>) {
    // Hook to your analytics backend or wx.reportEvent
    console.log('[Analytics]', name, props || {});
  }
}
