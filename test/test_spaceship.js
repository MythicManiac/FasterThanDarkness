import { EngineModule, GeneratorModule } from "../src/spaceship/module";
import { Compartment } from "../src/spaceship/compartment";
import { Spaceship } from "../src/spaceship/spaceship";

import { expect } from "chai";


describe("Spaceship", function() {
  it("Should be able to add compartments", function() {
    let spaceship = new Spaceship();
    let comp1 = new Compartment("Test compartment", 5);
    let comp2 = new Compartment("Test compartment", 2);
    expect(spaceship.hasCompartment(comp1)).to.be.false;
    expect(spaceship.hasCompartment(comp2)).to.be.false;
    expect(spaceship.addCompartment(comp1)).to.be.true;
    expect(spaceship.addCompartment(comp1)).to.be.false; // Already added
    expect(spaceship.hasCompartment(comp1)).to.be.true;
    expect(spaceship.hasCompartment(comp2)).to.be.false;
    expect(spaceship.addCompartment(comp2)).to.be.true;
    expect(spaceship.hasCompartment(comp1)).to.be.true;
    expect(spaceship.hasCompartment(comp2)).to.be.true;
  });
  it("Should be able to remove compartments", function() {
    let spaceship = new Spaceship();
    let comp1 = new Compartment("Test compartment", 5);
    let comp2 = new Compartment("Test compartment", 2);
    expect(spaceship.removeCompartment(comp1)).to.be.false; // Not added yet
    spaceship.addCompartment(comp1);
    spaceship.addCompartment(comp2);
    expect(spaceship.hasCompartment(comp1)).to.be.true;
    expect(spaceship.hasCompartment(comp2)).to.be.true;
    expect(spaceship.removeCompartment(comp1)).to.be.true;
    expect(spaceship.removeCompartment(comp1)).to.be.false; // Already removed
    expect(spaceship.hasCompartment(comp1)).to.be.false;
    expect(spaceship.hasCompartment(comp2)).to.be.true;
    expect(spaceship.removeCompartment(comp2)).to.be.true;
    expect(spaceship.hasCompartment(comp1)).to.be.false;
    expect(spaceship.hasCompartment(comp2)).to.be.false;
  });
  it("Should be able to tell if it has a specific compartment", function() {
    let spaceship = new Spaceship();
    let comp1 = new Compartment("Test compartment", 5);
    let comp2 = new Compartment("Test compartment", 2);
    expect(spaceship.hasCompartment(comp1)).to.be.false;
    expect(spaceship.hasCompartment(comp2)).to.be.false;
    spaceship.addCompartment(comp1);
    expect(spaceship.hasCompartment(comp1)).to.be.true;
    expect(spaceship.hasCompartment(comp2)).to.be.false;
    spaceship.addCompartment(comp2);
    expect(spaceship.hasCompartment(comp1)).to.be.true;
    expect(spaceship.hasCompartment(comp2)).to.be.true;
    spaceship.removeCompartment(comp1);
    expect(spaceship.hasCompartment(comp1)).to.be.false;
    expect(spaceship.hasCompartment(comp2)).to.be.true;
    spaceship.removeCompartment(comp2);
    expect(spaceship.hasCompartment(comp1)).to.be.false;
    expect(spaceship.hasCompartment(comp2)).to.be.false;
  });
  it("Should be able to update total energy and resource status", function() {
    let spaceship = new Spaceship();
    expect(spaceship.resources.energy).to.equal(0);
  });
  describe("Resources", function() {
    it("Should be able to know unused energy amount", function() {
      let spaceship = new Spaceship();
      let compartment1 = new Compartment("Compartment 1", 10);
      let compartment2 = new Compartment("Compartment 2", 10);
      let generator1 = new GeneratorModule("Generator", 1, 0);
      let generator2 = new GeneratorModule("Generator", 1, 0);
      let engine1 = new EngineModule("Engine", 1, 1);
      let engine2 = new EngineModule("Engine", 1, 1);
      expect(spaceship.resources.energy).to.equal(0);
      spaceship.updateResources();
      expect(spaceship.resources.energy).to.equal(0);
      expect(compartment1.addModule(generator1)).to.be.true;
      expect(spaceship.addCompartment(compartment1)).to.be.true;
      expect(spaceship.resources.energy).to.equal(0);
      spaceship.updateResources();
      expect(spaceship.resources.energy).to.equal(1);
      expect(compartment2.addModule(generator2)).to.be.true;
      expect(spaceship.addCompartment(compartment2)).to.be.true;
      expect(spaceship.resources.energy).to.equal(1);
      spaceship.updateResources();
      expect(spaceship.resources.energy).to.equal(2);
      expect(compartment1.addModule(engine1)).to.be.true;
      spaceship.updateResources();
      expect(spaceship.resources.energy).to.equal(1);
      expect(spaceship.resources.time).to.equal(1);
      expect(compartment1.addModule(engine2)).to.be.true;
      spaceship.updateResources();
      expect(spaceship.resources.energy).to.equal(0);
      expect(spaceship.resources.time).to.equal(2);
      expect(spaceship.removeCompartment(compartment1)).to.be.true;
      spaceship.updateResources();
      expect(spaceship.resources.energy).to.equal(1);
      expect(spaceship.resources.time).to.equal(0);
    });
  });
});
