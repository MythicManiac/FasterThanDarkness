
export class Compartment {

  /**
   * Creates a new compartment instance
   * 
   * @param {string} name 
   * @param {number} maxCapacity 
   */
  constructor(name, maxCapacity) {
    this._name = name;
    this._usedCapacity = 0;
    this._maxCapacity = maxCapacity;
    this._modules = [];
  }
  
  /**
   * Name of the compartment
   */
  get name() {
    return this._name;
  }

  /**
   * Capacity currently in use by modules in the compartment
   */
  get usedCapacity() {
    return this._usedCapacity;
  }

  /**
   * Capacity currently available
   */
  get freeCapacity() {
    return this._maxCapacity - this._usedCapacity;
  }

  /**
   * Maximum module capacity of the compartment
   */
  get maxCapacity() {
    return this._maxCapacity;
  }

  /**
   * Returns true if the module is found in this compartment, false otherwise.
   * 
   * @param {Module} module 
   */
  hasModule(module) {
    let index = this._modules.indexOf(module);
    return index !== -1;
  }

  /**
   * Returns true if the compartment is full, otherwise false
   */
  get isFull() {
    return this.freeCapacity <= 0;
  }

  /**
   * Returns true if the module can fit to the compartment, otherwise false
   * 
   * @param {Module} module 
   */
  canFitModule(module) {
    return module.requiredCapacity <= this.freeCapacity;
  }

  /**
   * Add a module to the compartment
   * 
   * Returns true if the module was successfully added, false otherwise
   * 
   * @param {Module} module 
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
   * 
   * Returns true if the module was removed successfully, false otherwise
   * 
   * @param {Module} module 
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
}
