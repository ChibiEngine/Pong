import PixiObject from "chibiengine/src/gameobjects/PixiObject.ts";
import { Graphics } from "pixi.js";

export default class DashedLine extends PixiObject<Graphics> {
  constructor(width: number, height: number) {
    super(new Graphics());
    this.pixi.lineStyle(width, 0xFFFFFF, 1, 0);
    for (let i = 0; i < height; i += 20) {
      this.pixi.moveTo(0, i);
      this.pixi.lineTo(0, i + 10);
    }
  }
}