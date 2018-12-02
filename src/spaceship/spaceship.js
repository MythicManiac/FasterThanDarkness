import {
  Energy, Crew, Food,
  Money, Time, ResourceCollection
} from "./resource"


export class Spaceship {
  constructor() {
    this._compartments = [];
    this._resources = new ResourceCollection();
  }

  /**
   * Perform an update check on all modules. This will recalculate current
   * energy production, disable modules if there's not enough energy, and
   * collect resources provided by modules.
   */
  updateModules() {
    this._compartments.forEach(compartment => {
      compartment
    });
  }
}
