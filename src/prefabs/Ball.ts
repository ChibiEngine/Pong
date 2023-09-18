import {Graphics} from "@pixi/graphics";

import PixiObject from "chibiengine/gameobjects/PixiObject";
import {FixedUpdatable} from "chibiengine/gameobjects/Updatable";

export default class Ball extends PixiObject<Graphics> implements FixedUpdatable {
  private frozen = true;

  private speed = 15;
  public direction = {x: 0.5, y: 0.5};

  constructor() {
    super(new Graphics());
    this.beginFill(0xFFFFFF);
    this.drawCircle(0, 0, 10);
    this.endFill();

    this.position.setTransition(1000/50);
  }

  public freeze() {
    this.frozen = true;
  }

  public unfreeze() {
    this.frozen = false;
  }

  public bounceX() {
    const xMultiplier = this.direction.x > 0 ? -1 : 1;
    const yMultiplier = this.direction.y > 0 ? 1 : -1;

    this.direction.y = yMultiplier * Math.random()/2;
    this.direction.x = (1 - Math.abs(this.direction.y)) * xMultiplier;

    if(this.position.x < 10) {
      this.position.x = 10;
    } else if(this.position.x > this.scene.game.screen.width) {
      this.position.x = this.scene.game.screen.width;
    }
  }

  public bounceY() {
    this.direction.y *= -1;
    if(this.position.y < 0) {
      this.position.y = 0;
    } else if(this.position.y > this.scene.game.screen.height) {
      this.position.y = this.scene.game.screen.height;
    }
  }

  public update() {
    if(this.frozen) {
      return
    }

    this.position.x += this.speed * this.direction.x;
    this.position.y += this.speed * this.direction.y;
  }

  public reset() {
    this.direction = {x: 0.5, y: 0.5};
    this.setPosition({x: this.scene.game.screen.center.x-2, y: this.scene.game.screen.center.y - 5});
    this.freeze();
  }
}