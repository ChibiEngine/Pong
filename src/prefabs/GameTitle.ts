import { Text } from "@pixi/text";

import Container from "chibiengine/gameobjects/Container";
import PixiObject from "chibiengine/gameobjects/PixiObject";


export default class GameTitle extends Container {
  constructor() {
    super();
  }

  async create(): Promise<void> {
    super.create();
    this.add(new PixiObject(new Text("Pong", {
      fill: 0xFFFFFF,
    })));
  }
}