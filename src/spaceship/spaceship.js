import { Energy, Crew, Food, Money, Time } from "./resources"


export class Spaceship {
  constructor() {
    this.compartments = [];
    this.resources = new Map([
      [Energy, new Energy(0)],
      [Crew, new Crew(0)],
      [Food, new Food(0)],
      [Money, new Money(0)],
      [Time, new Time(0)],
    ]);
  }

  /**
   * Perform an update check on all modules. This will recalculate current
   * energy production, disable modules if there's not enough energy, and
   * collect resources provided by modules.
   */
  updateModules() {
  }
}
