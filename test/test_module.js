import { Module } from "../src/spaceship/module";
import { Compartment } from "../src/spaceship/compartment";

import { expect } from "chai";


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
});
