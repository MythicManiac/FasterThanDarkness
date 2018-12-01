import * as PIXI from 'pixi.js'

export class Game {
  constructor() {
    this.app = new PIXI.Application({
      width: 256,
      height: 256,
    });
  }

  run() {
    document.body.appendChild(this.app.view);
    PIXI.loader
      .add("assets/ship.png")
      .load(this.setup.bind(this))
  }

  setup() {
    this.ship = new PIXI.Sprite(PIXI.loader.resources["assets/ship.png"].texture);
    this.app.stage.addChild(this.ship);
    this.app.ticker.add(delta => this.gameLoop(delta));
  }

  gameLoop() {
    this.ship.x += 1;
  }
}
