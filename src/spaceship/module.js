
class Module {
  constructor(name, size, energyConsumption) {
    this.name = name;
    this.size = size;
    this.energyConsumption = energyConsumption;
    this.compartment = null;
  }

  /**
   * Returns true if this module is housed in a compartment, false otherwise.
   * 
   * @param {Compartment} compartment 
   */
  get isHoused() {
    return this.compartment !== null;
  }

  /**
   * Sets this modules' compartment.
   * 
   * Returns true if successfull, false otherwise
   * 
   * @param {Compartment} compartment 
   */
  setCompartment(compartment) {
    if (this.isInCompartment) {
      return false;
    }
    this.compartment = compartment;
    return true;
  }

  /**
   * Unsets this module's compartment. Returns true if successfull,
   * false otherwise
   *
   * @param {Compartment} compartment 
   */
  unsetCompartment(compartment) {
    if (!this.isInCompartment) {
      return false;
    }
    this.compartment = null;
    return true;
  }
}

class EngineModule extends Module {
}

class WeaponModule extends Module {
}

class LifeSupportModule extends Module {
}

class ShieldModule extends Module {
}

class StorageModule extends Module {
}

class GeneratorModule extends Module {
}
