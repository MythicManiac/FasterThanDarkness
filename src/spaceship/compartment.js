import { ResourceCollection } from "./resource";

/**
 * Spaceship compartment
 */
export class Compartment {

  /**
   * Creates a new compartment instance
   * @param {string} name - Name of the compartment
   * @param {number} maxCapacity - Maximum module capacity
   */
  constructor(name, maxCapacity) {
    this._name = name;
    this._usedCapacity = 0;
    this._maxCapacity = maxCapacity;
    this._modules = [];
  }

  /**
   * Name of the compartment
   * @type {string}
   */
  get name() {
    return this._name;
  }

  /**
   * Module capacity currently in use
   * @type {number}
   */
  get usedCapacity() {
    return this._usedCapacity;
  }

  /**
   * Module capacity currently available
   * @type {number}
   */
  get freeCapacity() {
    return this._maxCapacity - this._usedCapacity;
  }

  /**
   * Maximum module capacity of the compartment
   * @type {number}
   */
  get maxCapacity() {
    return this._maxCapacity;
  }

  /**
   * Whether the compartment is full or not
   * @type {boolean}
   */
  get isFull() {
    return this.freeCapacity <= 0;
  }

  /**
   * Check if the compartment has a specific module
   * @param {Module} module - The module to check for
   * @returns {boolean} True if the module is found, otherwise false
   */
  hasModule(module) {
    let index = this._modules.indexOf(module);
    return index !== -1;
  }

  /**
   * Check if a module fits to the compartment
   * @param {Module} module - The module to check for
   * @returns {boolean} True if the module fits, otherwise false
   */
  canFitModule(module) {
    return module.requiredCapacity <= this.freeCapacity;
  }

  /**
   * Add a module to the compartment
   * @param {Module} module - The module to be added
   * @returns {boolean} True if addition was successfull, false otherwise
   */
  addModule(module) {
    if (!this.canFitModule(module)) {
      return false;
    }
    let index = this._modules.indexOf(module);
    if (index === -1) {
      if (module.setCompartment(this)) {
        this._modules.push(module);
        this._usedCapacity += module.requiredCapacity;
        return true;
      }
    }
    return false;
  }

  /**
   * Remove a module from the compartment
   * @param {Module} module - The module to remove
   * @returns {boolean} True if removal was successfull, false otherwise
   */
  removeModule(module) {
    let index = this._modules.indexOf(module);
    if (index !== -1) {
      if (module.unsetCompartment(this)) {
        this._modules.splice(index);
        this._usedCapacity -= module.requiredCapacity;
        return true;
      }
    }
    return false;
  }

  /**
   * Provides this module with power from a ResourceCollection
   * @param {ResourceCollection} availableResources
   */
  providePower(availableResources) {
    this._modules.forEach(module => {
      module.providePower(availableResources);
    });
  }

  /**
   * Returns all resources provided by the modules in this compartment
   * @returns {ResourceCollection} The resources provided by this compartment
   */
  collectResources() {
    let totalResources = new ResourceCollection();
    this._modules.forEach(module => {
      totalResources.addFromCollection(module.collectResources());
    });
    return totalResources;
  }
}
