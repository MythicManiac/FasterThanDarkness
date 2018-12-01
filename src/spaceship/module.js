
class Module {
  constructor(name, size, energyConsumption) {
    this.name = name;
    this.size = size;
    this.energyConsumption = energyConsumption;
    this.compartment = null;
  }

  get isInCompartment() {
    /**
     * Returns true if this module is housed in a compartment,
     * false otherwise.
     */
    return this.compartment !== null;
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
