import * as PIXI from "pixi.js";
import { Spaceship } from "./content/spaceships";
import {
  ResourceCollection, Energy, Crew, Firepower,
  Time, Money, Shield, Food
} from "./engine/resource";
PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;


function getTexture(name) {
  return PIXI.loader.resources[name].texture;
}


class ResourceScreen {
  constructor() {
    this.container = new PIXI.Container();
    this.textureMap = new Map([
      [Energy, getTexture("assets/resource_energy.png")],
      [Crew, getTexture("assets/resource_crew.png")],
      [Firepower, getTexture("assets/resource_firepower.png")],
      [Time, getTexture("assets/resource_time.png")],
      [Money, getTexture("assets/resource_money.png")],
      [Shield, getTexture("assets/resource_shield.png")],
      [Food, getTexture("assets/resource_food.png")]
    ]);
  }

  updateContainer(resources) {
    let baseResources = new ResourceCollection(
      new Energy(0),
      new Crew(0),
      new Firepower(0),
      new Time(0),
      new Money(0),
      new Shield(0),
      new Food(0)
    );
    baseResources.addFromCollection(resources);
    let container = new PIXI.Container();
    let text_style = new PIXI.TextStyle({
      fontFamily: "Arial",
      fontSize: 12,
      fill: "white",
    });

    let index = 0;
    baseResources.forEach((resource, resourceClass) => {
      let sprite = new PIXI.Sprite(this.textureMap.get(resourceClass));
      sprite.width = 32;
      sprite.height = 32;
      sprite.x = 5;
      sprite.y = 20 + (index * (32 + 5));
      container.addChild(sprite);

      let text = new PIXI.Text(resource.value, text_style);
      text.x = sprite.x + sprite.width + 5;
      text.y = sprite.y + sprite.height / 2 - text.height / 2;
      container.addChild(text);

      index += 1;
    });
    this.container = container;
  }
}


export class Game {
  constructor() {
    this.app = new PIXI.Application({
      width: 1280,
      height: 720,
      roundPixels: true,
    });
    this.spaceship = new Spaceship();
    this.spaceship.updateResources();
  }

  run() {
    document.body.appendChild(this.app.view);
    PIXI.loader
      .add("assets/ship.png")
      .add("assets/resource_energy.png")
      .add("assets/resource_time.png")
      .add("assets/resource_shield.png")
      .add("assets/resource_food.png")
      .add("assets/resource_money.png")
      .add("assets/resource_crew.png")
      .add("assets/resource_firepower.png")
      .load(this.setup.bind(this));
  }

  setup() {
    this.container = new PIXI.Container();
    this.resourceScreen = new ResourceScreen();
    this.resourceScreen.updateContainer(this.spaceship.resources);
    this.container.addChild(this.resourceScreen.container);

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
