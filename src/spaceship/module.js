import { ResourceCollection, Energy } from "./resource";

/**
 * Spaceship module
 */
export class Module {

  /**
   * Creates a new module instance
   * @param {string} name
   * @param {number} requiredCapacity
   * @param {number} requiredEnergy
   */
  constructor(name, requiredCapacity, requiredEnergy) {
    this._name = name;
    this._requiredCapacity = requiredCapacity;
    this._requiredEnergy = requiredEnergy;
    this._compartment = null;
  }

  /**
   * Name of the module
   * @type {string}
   */
  get name() {
    return this._name;
  }

  /**
   * The capacity required by this module
   * @type {number}
   */
  get requiredCapacity() {
    return this._requiredCapacity;
  }

  /**
   * The compartment this module is housed in, if any
   * @type {Compartment}
   */
  get compartment() {
    return this._compartment;
  }

  /**
   * The energy required by this module
   * @type {number}
   */
  get requiredEnergy() {
    return this._requiredEnergy;
  }

  /**
   * True if housed in a compartment, false otherwise.
   * @type {boolean}
   */
  get isHoused() {
    return this._compartment !== null;
  }

  /**
   * Sets this modules' compartment.
   * @param {Compartment} compartment - The compartment to set to
   * @returns {boolean} True if successfull, false otherwise
   */
  setCompartment(compartment) {
    if (this.isHoused) {
      return false;
    }
    this._compartment = compartment;
    return true;
  }

  /**
   * Unsets this module's compartment.
   * @param {Compartment} compartment - The compartment to unset
   * @returns {boolean} True if successfull, false otherwise
   */
  unsetCompartment(compartment) {
    if (this._compartment !== compartment) {
      return false;
    }
    this._compartment = null;
    return true;
  }

  /**
   * Gets the resources provided by this module
   * @returns {Resource[]} The provided resources
   */
  getProvidedResources() {
    // TODO: Remove placeholder
    return new ResourceCollection(new Energy(1));
  }
}

// eslint-disable-next-line no-unused-vars
class EngineModule extends Module {
}

// eslint-disable-next-line no-unused-vars
class WeaponModule extends Module {
}

// eslint-disable-next-line no-unused-vars
class LifeSupportModule extends Module {
}

// eslint-disable-next-line no-unused-vars
class ShieldModule extends Module {
}

// eslint-disable-next-line no-unused-vars
class StorageModule extends Module {
}

// eslint-disable-next-line no-unused-vars
class GeneratorModule extends Module {
}
