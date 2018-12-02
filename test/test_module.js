import {
  Module, EngineModule, ShieldModule,
  LifeSupportModule, WeaponModule, GeneratorModule
} from "../src/spaceship/module";
import { Compartment } from "../src/spaceship/compartment";

import { expect } from "chai";
import { ResourceCollection, Energy, Time, Shield, Food, Firepower } from "../src/spaceship/resource";


describe("Module", function() {
  it("Should have a working name property", function() {
    let module = new Module("Test module", 1, 1);
    expect(module.name).to.equal("Test module");
  });
  it("Should have a working required capacity property", function() {
    let module = new Module("Test module", 5, 1);
    expect(module.requiredCapacity).to.equal(5);
  });
  it("Should have a working energy consumption property", function() {
    let module = new Module("Test module", 1, 5);
    expect(module.requiredEnergy).to.equal(5);
  });
  it("Should have working compartment logic", function() {
    let module = new Module("Test module", 1, 1);
    let compartment = new Compartment("Test compartment", 1);
    let compartment2 = new Compartment("Test compartment 2", 1);
    expect(module.isHoused).to.be.false;
    expect(module.compartment).to.be.null;
    expect(module.setCompartment(compartment)).to.be.true;
    expect(module.compartment).to.equal(compartment);
    expect(module.isHoused).to.be.true;
    expect(module.setCompartment(compartment2)).to.be.false;  // Already in one
    expect(module.compartment).to.equal(compartment);
    expect(module.unsetCompartment(compartment2)).to.be.false;  // Wrong one
    expect(module.isHoused).to.be.true;
    expect(module.unsetCompartment(compartment)).to.be.true;
    expect(module.compartment).be.null;
    expect(module.isHoused).to.be.false;
    expect(module.setCompartment(compartment2)).to.be.true;
    expect(module.isHoused).to.be.true;
    expect(module.compartment).to.equal(compartment2);
  });
  it("Should update powered status properly", function() {
    let module = new Module("Test module", 1, 5);
    expect(module.hasPower).to.be.false;
    let resources = new ResourceCollection(new Energy(4));
    expect(resources.energy).to.equal(4);
    expect(module.providePower(resources)).to.be.false;
    expect(module.hasPower).to.be.false;
    expect(resources.energy).to.equal(4);
    resources.add(new Energy(2));
    expect(resources.energy).to.equal(6);
    expect(module.providePower(resources)).to.be.true;
    expect(module.hasPower).to.be.true;
    expect(resources.energy).to.equal(1);
    expect(module.providePower(resources)).to.be.false;
    expect(module.hasPower).to.be.false;
    expect(resources.energy).to.equal(1);
  });
  it("Should always be powered if no energy is required", function() {
    let module = new Module("Test module", 1, 0);
    expect(module.hasPower).to.be.true;
    let resources = new ResourceCollection(new Energy(-5));
    expect(module.providePower(resources)).to.be.true;
    expect(module.hasPower).to.be.true;
  });
  it("Should be able to indicate potential resources", function() {
    let module = new Module("Test", 1, 1);
    let resources = new ResourceCollection();
    expect(module.getPotentialResources().isEqual(resources)).to.be.true;
    module = new EngineModule("Engine", 1, 1);
    resources = new ResourceCollection(new Time(1));
    expect(module.getPotentialResources().isEqual(resources)).to.be.true;
    module = new ShieldModule("Shield", 1, 1);
    resources = new ResourceCollection(new Shield(1));
    expect(module.getPotentialResources().isEqual(resources)).to.be.true;
    module = new WeaponModule("Weapon", 1, 1);
    resources = new ResourceCollection(new Firepower(1));
    expect(module.getPotentialResources().isEqual(resources)).to.be.true;
    module = new LifeSupportModule("Food", 1, 1);
    resources = new ResourceCollection(new Food(1));
    expect(module.getPotentialResources().isEqual(resources)).to.be.true;
    module = new GeneratorModule("Energy", 1, 1);
    resources = new ResourceCollection(new Energy(1));
    expect(module.getPotentialResources().isEqual(resources)).to.be.true;
  });
  it("Should be able to collect resources if powered", function() {
    let module = new EngineModule("Engine", 1, 1);
    expect(module.hasPower).to.be.false;
    expect(module.isDisabled).to.be.false;
    let expected = new ResourceCollection(new Time(1));
    expect(module.getPotentialResources().isEqual(expected)).to.be.true;
    let nothing = new ResourceCollection();
    expect(module.collectResources().isEqual(nothing)).to.be.true;
    let energy = new ResourceCollection(new Energy(1));
    expect(module.providePower(energy)).to.be.true;
    expect(module.hasPower).to.be.true;
    expect(module.collectResources().isEqual(expected)).to.be.true;
  });
  it("Should be able to be enabled and disabled", function() {
    let module = new Module("Test", 1, 1);
    expect(module.isDisabled).to.be.false;
    module.disable();
    expect(module.isDisabled).to.be.true;
    module.enable();
    expect(module.isDisabled).to.be.false;
  });
  it("Should not consume power or provide resources when disabled", function() {
    let module = new EngineModule("Test", 1, 1);
    let energy = new ResourceCollection(new Energy(1));
    let nothing = new ResourceCollection();
    expect(module.isDisabled).to.be.false;
    expect(module.hasPower).to.be.false;
    module.disable();
    expect(module.providePower(energy)).to.be.false;
    expect(energy.energy).to.equal(1);
    expect(module.collectResources().isEqual(nothing)).to.be.true;
  });
});
