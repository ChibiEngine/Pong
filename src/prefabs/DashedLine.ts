import {Graphics} from "@pixi/graphics";

import PixiObject from "chibiengine/gameobjects/PixiObject";

export default class DashedLine extends PixiObject<Graphics> {
  constructor(width: number, height: number) {
    super(new Graphics());
    this.lineStyle(width, 0xFFFFFF, 1, 0);
    for (let i = 0; i < height; i += 20) {
      this.moveTo(0, i);
      this.lineTo(0, i + 10);
    }
  }
}