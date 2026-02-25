import { _decorator, Component, Label, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("Result")
export class Result extends Component {
  @property({
    type: Label,
  })
  public scoreLabel: Label = null;

  @property({
    type: Label,
  })
  public highScore: Label = null;

  @property({
    type: Label,
  })
  public resultEnd: Label = null;

  maxScore: number = 0;
  currentScore: number;

  updateScore(num: number) {
    this.currentScore = num;
    this.scoreLabel.string = "Score: " + this.currentScore;
  }
  resetScore() {
    this.updateScore(0);
    this.hideResult();
  }
  addScore() {
    this.updateScore(this.currentScore + 1);
  }
  showResult() {
    this.maxScore = Math.max(this.currentScore, this.maxScore);
    this.highScore.string = "High Score: " + this.maxScore;

    this.resultEnd.node.active = true;
  }

  hideResult() {
    this.highScore.node.active = false;
    this.resultEnd.node.active = false;
  }
}
