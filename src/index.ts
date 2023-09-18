import Game from "chibiengine/game/Game";
import PongScene from "./PongScene";

const game = new Game({
  width: 500,
  height: 500,
  resolution: window.devicePixelRatio || 1,
  backgroundColor: 0
});

game.addScene(new PongScene());