import * as PIXI from 'pixi.js'

export class Game {
  constructor() {
  }

  run() {
    const app = new PIXI.Application({
      width: 256,
      height: 256,
    });

    document.body.appendChild(app.view);

    PIXI.loader
      .add("assets/ship.png")
      .load(setup);

    let ship;

    function setup() {
      ship = new PIXI.Sprite(PIXI.loader.resources["assets/ship.png"].texture);
      app.stage.addChild(ship);

      app.ticker.add(delta => gameLoop(delta));
    }

    function gameLoop(delta) {
      ship.x += 1;
    }
  }
}
