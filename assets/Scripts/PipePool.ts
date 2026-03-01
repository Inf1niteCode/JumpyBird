import { _decorator, Component, instantiate, Node, NodePool, Prefab } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PipePool")
export class PipePool extends Component {
  @property({
    type: Prefab,
  })
  public prefabPipes = null;

  @property({
    type: Node,
  })
  public pipePollHome: Node;

  public pool = new NodePool();
  public createPipe: Node;

  initPool() {
    let initCount = 3;

    for (let i = 0; i < initCount; i++) {
      let createPipe = instantiate(this.prefabPipes);

      if (i == 0) {
        this.pipePollHome.addChild(createPipe);
      } else {
        this.pool.put(createPipe);
      }
    }
  }

  addPool() {
    if (this.pool.size() > 0) {
      this.createPipe = this.pool.get();
    } else {
      this.createPipe = instantiate(this.prefabPipes);
    }

    this.pipePollHome.addChild(this.createPipe);
  }

  reset() {
    this.pipePollHome.removeAllChildren();
    this.pool.clear();
    this.initPool();
  }
}
