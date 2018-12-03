import * as PIXI from "pixi.js";
import { Spaceship } from "./content/spaceships";
import {
  Energy, Crew, Firepower,
  Time, Money, Shield, Food
} from "./engine/resource";
PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

const TEXT_STYLE = new PIXI.TextStyle({
  fontFamily: "Arial",
  fontSize: 24,
  fill: "white",
});


function getTexture(name) {
  return PIXI.loader.resources[name].texture;
}

class ResourceRenderer {
  constructor(texture) {
    this.container = new PIXI.Container();
    this.sprite = new PIXI.Sprite(texture);
    this.text = new PIXI.Text("0", TEXT_STYLE);
    this.container.addChild(this.sprite);
    this.container.addChild(this.text);
    this.updateText("0");
  }

  get width() {
    return this.sprite.width + 48;
  }

  updateText(newText) {
    this.text.text = newText.toString();
    this.text.x = this.sprite.width + 48 / 2 - this.text.width / 2;
    this.text.y = this.sprite.height / 2 - this.text.height / 2;
  }
}


class ResourceCollectionRenderer {
  constructor() {
    this.container = new PIXI.Container();
    this.resourceRenderers = new Map([
      [Time, new ResourceRenderer(getTexture("assets/resource_time.png"))],
      [Energy, new ResourceRenderer(getTexture("assets/resource_energy.png"))],
      [Firepower, new ResourceRenderer(getTexture("assets/resource_firepower.png"))],
      [Shield, new ResourceRenderer(getTexture("assets/resource_shield.png"))],
      // [Food, new ResourceRenderer(getTexture("assets/resource_food.png"))],
      // [Crew, new ResourceRenderer(getTexture("assets/resource_crew.png"))],
      [Money, new ResourceRenderer(getTexture("assets/resource_money.png"))]
    ]);
    let padding = 10;
    let index = 0;
    this._width = 0;
    this.resourceRenderers.forEach(renderer => {
      this.container.addChild(renderer.container);
      renderer.container.x = index * (renderer.width + padding);
      this._width += renderer.width + padding;
      index += 1;
    });
  }

  get width() {
    return this._width;
  }

  updateResources(resources) {
    resources.forEach((resource, resourceClass) => {
      let renderer = this.resourceRenderers.get(resourceClass);
      if (renderer) {
        renderer.updateText(resource.value);
      }
    });
  }
}


export class Game {
  constructor() {
    this.app = new PIXI.Application({
      width: 1920,
      height: 1080,
      roundPixels: true,
      transparent: true,
    });
    this.spaceship = new Spaceship();
    this.spaceship.updateResources();
  }

  run() {
    document.body.appendChild(this.app.view);
    PIXI.loader
      .add("assets/spaceship.png")
      .add("assets/resource_energy.png")
      .add("assets/resource_time.png")
      .add("assets/resource_shield.png")
      .add("assets/resource_food.png")
      .add("assets/resource_money.png")
      .add("assets/resource_crew.png")
      .add("assets/resource_firepower.png")
      .add("assets/space_background.png")
      .load(this.setup.bind(this));
  }

  setup() {
    this.container = new PIXI.Container();

    this.resourceRenderer = new ResourceCollectionRenderer();
    this.resourceRenderer.updateResources(this.spaceship.resources);
    this.resourceRenderer.container.x = (
      (1920 / 2) - this.resourceRenderer.width / 2
    );
    this.container.addChild(this.resourceRenderer.container);

    this.ship = new PIXI.Sprite(getTexture("assets/spaceship.png"));
    this.container.addChild(this.ship);

    this.app.stage.addChild(this.container);
    this.app.ticker.add(this.update.bind(this));
  }

  update(delta) {
  }
}
