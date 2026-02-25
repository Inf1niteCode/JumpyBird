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
} from "cc";
const { ccclass, property } = _decorator;

import { Ground } from "./Ground";
import { Result } from "./Result";

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
    type: CCInteger,
  })
  public speed: number = 50;

  @property({
    type: CCInteger,
  })
  public pipeSpeed: number = 40;

  onLoad() {
    this.initListener();
    this.result.resetScore();
    director.pause();
  }

  initListener() {
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
  }

  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.KEY_A:
        this.gameOver();
        break;
      case KeyCode.KEY_P:
        this.result.addScore();
        break;
      case KeyCode.KEY_Q:
        this.resetGame();
        break;
    }
  }

  startGame() {
    this.result.hideResult();
    director.resume();  
  }
  gameOver() {
    this.result.showResult();
    director.pause();
  }
  resetGame() {
    this.result.resetScore();
    this.startGame();
  }
}
