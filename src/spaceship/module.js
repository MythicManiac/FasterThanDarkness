
class Module {
  constructor(name, requiredCapacity, energyConsumption) {
    this._name = name;
    this._requiredCapacity = requiredCapacity;
    this._energyConsumption = energyConsumption;
    this._compartment = null;
  }

  /**
   * Name of the module
   */
  get name() {
    return this._name;
  }

  /**
   * The capacity required by this module
   */
  get requiredCapacity() {
    return this._requiredCapacity;
  }

  /**
   * True if this module is housed in a compartment, false otherwise.
   * 
   * @param {Compartment} compartment 
   */
  get isHoused() {
    return this._compartment !== null;
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
    this._compartment = compartment;
    return true;
  }

  /**
   * Unsets this module's compartment. Returns true if successfull,
   * false otherwise
   * 
   * @param {Compartment} compartment
   */
  unsetCompartment(compartment) {
    if (this._compartment !== compartment) {
      return false;
    }
    this._compartment = null;
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
