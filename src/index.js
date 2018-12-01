import * as PIXI from 'pixi.js'

const app = new PIXI.Application({
  width: 256,
  height: 256,
});

document.body.appendChild(app.view);

PIXI.loader
  .add("assets/ship.png")
  .load(setup);

function setup() {
  let cat = new PIXI.Sprite(PIXI.loader.resources["assets/ship.png"].texture);
  app.stage.addChild(cat);
}
