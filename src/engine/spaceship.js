import { ResourceCollection, Energy } from "./resource";


/**
 * Spaceship
 */
export class ISpaceship {
  constructor() {
    // TODO: Convert to use a Map() instead, mapping by name
    this._compartments = [];
    this._resources = new ResourceCollection();
  }

  /**
   * @returns {ResourceCollection} This spaceship's resources
   */
  get resources() {
    return this._resources;
  }

  /**
   * Checks if a compartment is in this spaceship
   * @param {Compartment} compartment - Compartment to check for
   * @returns {boolean} True if found, false otherwise
   */
  hasCompartment(compartment) {
    return this._compartments.indexOf(compartment) !== -1;
  }

  /**
   * Removes a compartment from the spaceship
   * @param {Compartment} compartment - Compartment to be removed
   * @returns {boolean} True if successful, false otherwise
   */
  addCompartment(compartment) {
    let index = this._compartments.indexOf(compartment);
    if (index === -1) {
      this._compartments.push(compartment);
      return true;
    }
    return false;
  }

  /**
   * Adds a compartment to the spaceship
   * @param {Compartment} compartment - Compartment to be added
   * @returns {boolean} True if successful, false otherwise
   */
  removeCompartment(compartment) {
    let index = this._compartments.indexOf(compartment);
    if (index !== -1) {
      this._compartments.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Returns the last compartment with a matching name
   * @param {string} name
   */
  getCompartmentByName(name) {
    let result;
    this._compartments.forEach(compartment => {
      if (compartment.name === name) {
        result = compartment;
      }
    });
    return result;
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
