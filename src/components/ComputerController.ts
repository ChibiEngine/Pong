import Behavior from "chibiengine/component/Behavior";
import GameObject from "chibiengine/gameobjects/GameObject";
import {Class} from "chibiengine/utils/type_utils";
import Ball from "../prefabs/Ball";

export default class ComputerController extends Behavior<"controller", GameObject> {
  readonly componentName = "controller";
  readonly targetType: Class<GameObject> = GameObject;
  public readonly updateRate = 20;

  public constructor(private readonly ball: Ball) {
    super();
  }

// @ts-ignore
  private target: GameObject;

  public apply(target: GameObject) {
    this.target = target;
    this.target.position.setTransition(50);
  }

  public update(): void {
    this.target.y = this.ball.y - this.target.size.height / 2;
  }
}