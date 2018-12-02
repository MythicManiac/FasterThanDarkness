import { ResourceCollection, Energy } from "./resource";


/**
 * Spaceship
 */
export class Spaceship {
  constructor() {
    this._compartments = [];
    this._resources = new ResourceCollection();
  }

  /**
   * Performs an update on the current resource status. This will:
   * - Collect the total available energy
   * - Update the power state of modules according to available energy
   * - Collect the resources provided by all powered modules
   */
  updateResources() {
    let energyCollection = new ResourceCollection();
    this._compartments.forEach(compartment => {
      energyCollection.addFromCollection(compartment.collectResources());
    });
    this._compartments.forEach(compartment => {
      compartment.providePower(energyCollection);
    });
    let resources = new ResourceCollection();
    this._compartments.forEach(compartment => {
      resources.addFromCollection(compartment.collectResources());
    });
    resources.set(new Energy(energyCollection.energy));
    this._resources = resources;
  }
}
