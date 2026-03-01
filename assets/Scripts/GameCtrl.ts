import {
  _decorator,
  CCInteger,
  Component,
  director,
  EventKeyboard,
  input,
  Input,
  KeyCode,
  Node,
  Contact2DType,
  Collider2D,
  IPhysics2DContact,
} from "cc";
const { ccclass, property } = _decorator;

import { Ground } from "./Ground";
import { Result } from "./Result";
import { Bird } from "./Bird";
import { PipePool } from "./PipePool";
import { BirdAudio } from "./BirdAudio";

@ccclass("GameCtrl")
export class GameCtrl extends Component {
  @property({
    type: Ground,
    tooltip: "this id ground",
  })
  public ground: Ground;

  @property({
    type: Result,
    tooltip: "this is result",
  })
  public result: Result;

  @property({
    type: Bird,
    tooltip: "this is bird",
  })
  public bird: Bird;

  @property({
    type: BirdAudio,
  })
  public clip: BirdAudio;

  @property({
    type: PipePool,
  })
  public pipeQueue: PipePool;

  @property({
    type: CCInteger,
  })
  public speed: number = 300;

  @property({
    type: CCInteger,
  })
  public pipeSpeed: number = 200;

  public isOver: boolean;

  onLoad() {
    this.initListener();
    this.result.resetScore();
    this.isOver = true;
    director.pause();
  }

  initListener() {
    this.node.on(Node.EventType.TOUCH_START, () => {
      if (this.isOver == true) {
        this.resetGame();
        this.bird.resetBird();
        this.startGame();
      }

      if (this.isOver == false) {
        this.bird.fly();
        this.clip.onAudioQueue(0);
      }
    });
  }

  startGame() {
    this.result.hideResult();
    director.resume();
  }
  gameOver() {
    this.result.showResult();
    this.isOver = true;
    this.clip.onAudioQueue(3);
    director.pause();
  }
  resetGame() {
    this.result.resetScore();
    this.pipeQueue.reset();
    this.isOver = false;
    this.startGame();
  }
  passPipe() {
    this.result.addScore();
    this.clip.onAudioQueue(1);
  }

  createPipe() {
    this.pipeQueue.addPool();
  }

  contactGroundPipe() {
    let collider = this.bird.getComponent(Collider2D);

    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }

  onBeginContact(
    selfCollider: Collider2D,
    otherCollider: Collider2D,
    contact: IPhysics2DContact,
  ) {
    this.bird.hitSomething = true;
    this.clip.onAudioQueue(2);
  }

  birdStruck() {
    this.contactGroundPipe();

    if (this.bird.hitSomething == true) {
      this.gameOver();
    }
  }

  update() {
    if (this.isOver == false) {
      this.birdStruck();
    }
  }
}
