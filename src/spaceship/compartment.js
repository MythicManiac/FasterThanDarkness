
class Compartment {
  constructor(name, capacity) {
    this.name = name;
    this.capacity = capacity;
    this.modules = [];
  }

  /**
   * Returns true if the module is found in this compartment, false otherwise.
   * 
   * @param {Module} module 
   */
  hasModule(module) {
    let index = this.modules.indexOf(module);
    return index !== -1;
  }

  /**
   * Add a module to the compartment
   * 
   * Returns true if the module was successfully added, false otherwise
   * 
   * @param {Module} module 
   */
  addModule(module) {
    let index = this.modules.indexOf(module);
    if (index === -1) {
      this.modules.push(module);
      return true;
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
    let index = this.modules.indexOf(module);
    if (index !== -1) {
      this.modules.splice(index)
      return true;
    }
    return false;
  }
}
