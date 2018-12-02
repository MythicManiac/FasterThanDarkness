import {
  ResourceCollection, Energy, Time,
  Firepower, Food, Shield
} from "./resource";

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
    this._hasPower = false;
    this._isDisabled = false;
  }

  /**
   * Name of the module
   * @type {string}
   */
  get name() {
    return this._name;
  }

  /**
   * Does this module have fule?
   * @type {boolean}
   */
  get hasPower() {
    return this._hasPower;
  }

  /**
   * Is this module disabled?
   * @type {boolean}
   */
  get isDisabled() {
    return this._isDisabled;
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
   * @returns {boolean} True if successful, false otherwise
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
   * @returns {boolean} True if successful, false otherwise
   */
  unsetCompartment(compartment) {
    if (this._compartment !== compartment) {
      return false;
    }
    this._compartment = null;
    return true;
  }

  /**
   * Provides this module with power from a ResourceCollection
   * @param {ResourceCollection} availableResources
   */
  providePower(availableResources) {
    this.hasPower = false;
    if (this.isDisabled) {
      return false;
    }
    if (this.requiredEnergy <= 0) {
      this.hasPower = true;
      return true;
    }
    if (availableResources.energy >= this.requiredEnergy) {
      availableResources.substract(new Energy(this.requiredEnergy));
      return true;
    }
    return false;
  }

  /**
   * Collects the resources produced by this module if it has power
   * @returns {ResourceCollection} The provided resources
   */
  collectResources() {
    if (this.hasPower) {
      return this.getPotentialResources();
    }
    return new ResourceCollection();
  }

  /**
   * Gets a ResourceCollection of resources this module will provide when
   * powered
   * @returns {ResourceCollection} Resources the module is capable of outputting
   */
  getPotentialResources() {
    return new ResourceCollection();
  }
}

// eslint-disable-next-line no-unused-vars
class EngineModule extends Module {
  getPotentialResources() {
    return new ResourceCollection(new Time(1));
  }
}

// eslint-disable-next-line no-unused-vars
class WeaponModule extends Module {
  getPotentialResources() {
    return new ResourceCollection(new Firepower(1));
  }
}

// eslint-disable-next-line no-unused-vars
class LifeSupportModule extends Module {
  getPotentialResources() {
    return new ResourceCollection(new Food(1));
  }
}

// eslint-disable-next-line no-unused-vars
class ShieldModule extends Module {
  getPotentialResources() {
    return new ResourceCollection(new Shield(1));
  }
}

// eslint-disable-next-line no-unused-vars
class GeneratorModule extends Module {
  getPotentialResources() {
    return new ResourceCollection(new Energy(1));
  }
}
