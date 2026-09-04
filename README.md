# wechat-mini-2d-game-template

Cocos Creator 3.x 微信小游戏 2D 模板（超休闲/广告变现方向）

本仓库包含：
- Cocos Creator 3.x 项目骨架（scripts 目录内为 TypeScript 核心脚本模板）
- 一个轻量的浏览器 Demo（demo/），便于快速试玩和联调（非 Cocos 引擎实现，但逻辑与脚本接口一致，便于概念验证）
- README.md：如何使用、构建到微信小游戏的注意点与后续步骤

注意：场景与预制体（Cocos Creator 编辑器文件）放置为占位说明文件。要在 Cocos Creator 中创建真实场景，请打开 Cocos Creator 3.x，将 assets/scripts 下的 TypeScript 文件挂载到节点并创建场景。

广告单元 ID 已保留为占位（WX_REWARD_AD_UNIT_ID / WX_INTERSTITIAL_AD_UNIT_ID），上线前需在微信后台创建并替换。
