import Scene from "chibiengine/src/game/Scene";
import PixiObject from "chibiengine/src/gameobjects/PixiObject";
import { Text } from "pixi.js";
import Racket from "./prefabs/Racket.ts";
import Ball from "./prefabs/Ball.ts";
import RacketController from "./components/RacketController.ts";
import DashedLine from "./prefabs/DashedLine.ts";
import {FixedUpdatable} from "../../ChibiEngine/src/gameobjects/Updatable.ts";

export default class PongScene extends Scene implements FixedUpdatable {
  private racket1: Racket;
  // @ts-ignore
  private racket2: Racket;

  private ball: Ball;

  private score1: PixiObject<Text>;
  private score2: PixiObject<Text>;

  protected async _create() {
    this.racket1 = this.add(new Racket())
        .addComponent(new RacketController())
        .setPosition({x: 0, y: this.game.screen.center.y - 50});

    this.racket2 = this.add(new Racket())
        .setPosition({x: this.game.screen.width - 10, y: this.game.screen.center.y - 50});

    this.ball = this.add(new Ball())
        .setPosition({x: this.game.screen.center.x, y: this.game.screen.center.y});
    this.ball.pivot.set(5, 5);

    this.score1 = this.add(new PixiObject(new Text("0", {
      fill: 0xFFFFFF,
    }))).setPosition({x: 10, y: 5});

    this.score1.anchor.set(0, 0);

    this.score2 = this.add(new PixiObject(new Text("0", {
      fill: 0xFFFFFF,
    }))).setPosition({x: this.game.screen.width - 10, y: 5});

    this.score2.anchor.set(1, 0);

    const line = this.add(new DashedLine(4, this.game.screen.height))
        .setPosition({x: this.game.screen.center.x, y: 0});
    line.pivot.set(4, 0);

    setTimeout(() => {
      this.ball.unfreeze();
    }, 1500);
  }

  public update() {
    const ball = this.ball;

    if(ball.position.x < 10) {
      if(ball.position.y > this.racket1.position.y && ball.position.y < this.racket1.position.y + 100) {
        ball.bounceX();
      }
    }

    if(ball.position.x < 0) {
      this.score2.text = (parseInt(this.score2.text) + 1).toString();
      ball.direction = {x: 0.5, y: 0.5};
      ball.setPosition({x: this.game.screen.center.x-2, y: this.game.screen.center.y - 5});
      ball.freeze();
      setTimeout(() => {
        ball.unfreeze();
      }, 1500);
    } else if (ball.position.x > this.scene.game.screen.width) {
      ball.bounceX();
    }

    if (ball.position.y < 0 || ball.position.y > this.scene.game.screen.height) {
      ball.bounceY();
    }
  }
}