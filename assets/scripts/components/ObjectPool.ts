import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ObjectPool')
export default class ObjectPool extends Component {
  private pool: Node[] = [];

  get(prefab: Prefab): Node {
    if (this.pool.length > 0) {
      return this.pool.pop()!;
    }
    const node = instantiate(prefab) as Node;
    return node;
  }

  put(node: Node) {
    // reset node state if needed
    this.pool.push(node);
  }
}
