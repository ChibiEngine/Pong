import { Text } from "@pixi/text";

import Scene from "chibiengine/game/Scene";
import PixiObject from "chibiengine/gameobjects/PixiObject";
import {FixedUpdatable, VariableUpdatable} from "chibiengine/gameobjects/Updatable";

import Racket from "./prefabs/Racket";
import Ball from "./prefabs/Ball";
import RacketController from "./components/RacketController";
import DashedLine from "./prefabs/DashedLine";
import ComputerController from "./components/ComputerController";

export default class PongScene extends Scene implements FixedUpdatable, VariableUpdatable {
  private racket1: Racket;
  // @ts-ignore
  private racket2: Racket;

  private ball: Ball;

  private fps: PixiObject<Text>;

  private score1: PixiObject<Text>;
  private score2: PixiObject<Text>;

  protected async _create() {
    this.fps = this.add(new PixiObject(new Text("0 fps", {
      fill: 0xFFFFFF,
    }))).setPosition({x: this.game.screen.width, y: this.game.screen.height});
    this.fps.anchor.set(1, 1);

    this.ball = this.add(new Ball())
        .setPosition({x: this.game.screen.center.x, y: this.game.screen.center.y});
    this.ball.pivot.set(5, 5);

    this.racket1 = this.add(new Racket())
        .addComponent(new RacketController())
        .setPosition({x: 0, y: this.game.screen.center.y - 50});

    this.racket2 = this.add(new Racket())
        .addComponent(new ComputerController(this.ball))
        .setPosition({x: this.game.screen.width - 10, y: this.game.screen.center.y - 50});

    this.score1 = this.add(new PixiObject(new Text("0", {
      fill: 0xFFFFFF,
    }))).setPosition({x: this.game.screen.width/2 - 60, y: 5});

    this.score1.anchor.set(0, 0);

    this.score2 = this.add(new PixiObject(new Text("0", {
      fill: 0xFFFFFF,
    }))).setPosition({x: this.game.screen.width/2 + 50, y: 5});

    this.score2.anchor.set(1, 0);

    const line = this.add(new DashedLine(4, this.game.screen.height))
        .setPosition({x: this.game.screen.center.x, y: 0});
    line.pivot.set(4, 0);

    setTimeout(() => {
      this.ball.unfreeze();
    }, 1500);

    // Test dynamic prefab import
    import("./prefabs/GameTitle.ts").then((module) => {
      // @ts-ignore TODO Fix this?
      this.add(new module.default());
    });
  }

  public update() {
    const ball = this.ball;

    if(ball.position.x < 10) {
      if(ball.position.y > this.racket1.position.y && ball.position.y < this.racket1.position.y + 100) {
        ball.bounceX();
      }
    } else if(ball.position.x > this.scene.game.screen.width - 10) {
      if(ball.position.y > this.racket2.position.y && ball.position.y < this.racket2.position.y + 100) {
        ball.bounceX();
      }
    }

    if(ball.position.x < 0) {
      this.score2.text = (parseInt(this.score2.text) + 1).toString();
      ball.reset();
      setTimeout(() => {
        ball.unfreeze();
      }, 1500);
    } else if (ball.position.x > this.scene.game.screen.width) {
      this.score1.text = (parseInt(this.score1.text) + 1).toString();
      ball.reset();
      setTimeout(() => {
        ball.unfreeze();
      }, 1500);    }

    if (ball.position.y < 0 || ball.position.y > this.scene.game.screen.height) {
      ball.bounceY();
    }
  }

  public variableUpdate(dt: number) {
    this.fps.text = `${Math.round(1000 / dt)} fps`;
  }
}