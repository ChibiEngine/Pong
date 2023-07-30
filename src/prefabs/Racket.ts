import PixiObject from "chibiengine/src/gameobjects/PixiObject.ts";
import { Graphics } from "pixi.js";

export default class Racket extends PixiObject<Graphics> {
  constructor() {
    super(new Graphics());
    this.beginFill(0xFFFFFF);
    this.drawRect(0, 0, 10, 100);
    this.endFill();
  }
}