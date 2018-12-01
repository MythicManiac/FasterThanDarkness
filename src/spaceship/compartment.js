
class Compartment {
  constructor(name, capacity) {
    this.name = name;
    this.capacity = capacity;
    this.modules = [];
  }

  hasModule(module) {
    /**
     * Returns true if the module is already in this compartment,
     * otherwise returns false
     */
    let index = this.modules.indexOf(module);
    return index !== -1;
  }

  addModule(module) {
    /**
     * Add a module to the compartment
     * 
     * Returns true if the module was added successfully, false
     * otherwise
     */
    let index = this.modules.indexOf(module);
    if (index === -1) {
      this.modules.push(module);
      return true;
    }
    return false;
  }

  removeModule(module) {
    /**
     * Remove a module to the compartment
     * 
     * Returns true if the module was removed successfylly, false
     * otherwise
     */
    let index = this.modules.indexOf(module);
    if (index !== -1) {
      this.modules.splice(index)
      return true;
    }
    return false;
  }
}
