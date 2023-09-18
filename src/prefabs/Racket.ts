import { Graphics } from "@pixi/graphics";

import PixiObject from "chibiengine/gameobjects/PixiObject";

export default class Racket extends PixiObject<Graphics> {
  constructor() {
    super(new Graphics());
    this.beginFill(0xFFFFFF);
    this.drawRect(0, 0, 10, 100);
    this.endFill();
  }
}