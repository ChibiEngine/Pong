import Behavior from "chibiengine/component/Behavior";
import GameObject from "chibiengine/gameobjects/GameObject";
import {Class} from "chibiengine/utils/type_utils";
import Keyboard from "chibiengine/keyboard/Keyboard";

export default class RacketController extends Behavior<"controller", GameObject> {
  readonly componentName = "controller";
  readonly targetType: Class<GameObject> = GameObject;
  public readonly updateRate = 20;

  // @ts-ignore
  private target: GameObject;

  public apply(target: GameObject) {
    this.target = target;
    this.target.position.setTransition(50);
  }

  public update(): void {
    if (Keyboard.wasKeyDown("ArrowUp", 50) && this.target.y > 1) {
      this.target.y -= 25;
    }
    if (Keyboard.wasKeyDown("ArrowDown", 50) && this.target.y < this.target.scene.game.screen.height - this.target.size.height - 1) {
      this.target.y += 25;
    }
  }
}