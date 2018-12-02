import * as PIXI from "pixi.js";
import { Spaceship } from "./content/spaceships";
PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

export class Game {
  constructor() {
    this.app = new PIXI.Application({
      width: 1280,
      height: 720,
      roundPixels: true,
    });
    this.spaceship = new Spaceship();
    this.spaceship.updateResources();
    console.log(this.spaceship.resources.toString());
  }

  run() {
    document.body.appendChild(this.app.view);
    PIXI.loader
      .add("assets/ship.png")
      .load(this.setup.bind(this));
  }

  setup() {
    this.container = new PIXI.Container();

    this.style = new PIXI.TextStyle({
      fontFamily: "Arial",
      fontSize: 12,
      fill: "white",
    });
    this.message = new PIXI.Text("Faster Than Darkness", this.style);
    this.container.addChild(this.message);

    this.ship = new PIXI.Sprite(PIXI.loader.resources["assets/ship.png"].texture);
    this.container.addChild(this.ship);

    this.app.stage.addChild(this.container);
    this.container.scale.x = 2;
    this.container.scale.y = 2;

    this.app.ticker.add(delta => this.gameLoop(delta));
  }

  gameLoop() {
    this.ship.x += 1;
  }
}
