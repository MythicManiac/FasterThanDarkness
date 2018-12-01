import { Module } from "../src/spaceship/module"
import { Compartment } from "../src/spaceship/compartment"
import { Spaceship } from "../src/spaceship/spaceship"

var expect = require("chai").expect;

describe("Spaceship", function() {
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

  describe("Compartment", function() {
    it("Should have a working name property", function() {
      let compartment = new Compartment("Test compartment", 1);
      expect(compartment.name).to.equal("Test compartment");
    });
    it("Should have a working maxCapacity property", function() {
      let compartment = new Compartment("Test compartment", 5);
      expect(compartment.maxCapacity).to.equal(5);
    });
    it("Should have a working module add and removal logic", function() {
      let compartment = new Compartment("Test compartment", 5);
      let module1 = new Module("Test module", 1, 1);
      let module2 = new Module("Test module", 1, 1);
      expect(compartment.hasModule(module1)).to.be.false;
      expect(compartment.hasModule(module2)).to.be.false;
      expect(compartment.addModule(module1)).to.be.true;
      expect(compartment.addModule(module1)).to.be.false; // Already added
      expect(compartment.hasModule(module1)).to.be.true;
      expect(compartment.hasModule(module2)).to.be.false;
      expect(compartment.addModule(module2)).to.be.true;
      expect(compartment.hasModule(module2)).to.be.true;
      expect(compartment.removeModule(module2)).to.be.true;
      expect(compartment.removeModule(module2)).to.be.false; // Already removed
      expect(compartment.hasModule(module1)).to.be.true;
      expect(compartment.hasModule(module2)).to.be.false;
    });
    it("Should properly track used capacity", function() {
      let compartment = new Compartment("Test compartment", 10);
      expect(compartment.usedCapacity).to.equal(0);
      expect(compartment.freeCapacity).to.equal(10);
      let module1 = new Module("Test module", 1, 1);
      compartment.addModule(module1);
      expect(compartment.usedCapacity).to.equal(1);
      expect(compartment.freeCapacity).to.equal(9);
      let module2 = new Module("Test module 2", 5, 1);
      compartment.addModule(module2);
      expect(compartment.usedCapacity).to.equal(6);
      expect(compartment.freeCapacity).to.equal(4);
    });
    it("Should have a working isFull property", function() {
      let compartment = new Compartment("Test compartment", 3);
      let module1 = new Module("Test module", 1, 1);
      let module2 = new Module("Test module", 2, 1);
      expect(compartment.isFull).to.be.false;
      compartment.addModule(module1);
      expect(compartment.isFull).to.be.false;
      compartment.addModule(module2);
      expect(compartment.isFull).to.be.true;
      compartment.removeModule(module1);
      expect(compartment.isFull).to.be.false;
    });
    it("Should be able to tell if a module can fit", function() {
      let compartment = new Compartment("Test compartment", 3);
      let module1 = new Module("Test module", 1, 1);
      let module2 = new Module("Test module", 3, 1);
      expect(compartment.canFitModule(module1)).to.be.true;
      expect(compartment.canFitModule(module2)).to.be.true;
      compartment.addModule(module1);
      expect(compartment.canFitModule(module2)).to.be.false;
      compartment.removeModule(module1);
      expect(compartment.canFitModule(module2)).to.be.true;
    });
    it("Should not add modules over capacity", function() {
      let compartment = new Compartment("Test compartment", 3);
      let module = new Module("Test module", 5, 1);
      expect(compartment.canFitModule(module)).to.be.false;
      expect(compartment.addModule(module)).to.be.false;
    });
    it("Should set itself as a modules compartment while adding", function() {
      let compartment = new Compartment("Test compartment", 3);
      let module = new Module("Test module", 1, 1);
      expect(module.compartment).to.be.null;
      expect(compartment.addModule(module)).to.be.true;
      expect(module.compartment).to.equal(compartment);
    });
    it("Should unset itself as a modules compartment on removal", function() {
      let compartment = new Compartment("Test compartment", 3);
      let module = new Module("Test module", 1, 1);
      expect(module.compartment).to.be.null;
      expect(compartment.addModule(module)).to.be.true;
      expect(module.compartment).to.equal(compartment);
      expect(compartment.removeModule(module)).to.be.true;
      expect(module.compartment).to.be.null;
    });
  });

  describe("Spaceship", function() {
  });
});
