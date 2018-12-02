import { EngineModule, GeneratorModule, ShieldModule } from "../src/engine/module";
import { Compartment } from "../src/engine/compartment";
import { ISpaceship } from "../src/engine/spaceship";

import { expect } from "chai";


describe("Spaceship", function() {
  it("Should be able to add compartments", function() {
    let spaceship = new ISpaceship();
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
    let spaceship = new ISpaceship();
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
    let spaceship = new ISpaceship();
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
  it("Should be able to fetch a compartment by name", function() {
    let spaceship = new ISpaceship();
    let comp1 = new Compartment("Test compartment 1", 5);
    let comp2 = new Compartment("Test compartment 2", 4);
    expect(spaceship.addCompartment(comp1)).to.be.true;
    expect(spaceship.addCompartment(comp2)).to.be.true;
    let fetched1 = spaceship.getCompartmentByName("Test compartment 1");
    let fetched2 = spaceship.getCompartmentByName("Test compartment 2");
    expect(fetched1).to.equal(comp1);
    expect(fetched2).to.equal(comp2);
  });
  describe("Resources", function() {
    it("Should be able to know unused energy amount", function() {
      let spaceship = new ISpaceship();
      let compartment1 = new Compartment("Compartment 1", 10);
      let compartment2 = new Compartment("Compartment 2", 10);
      let generator1 = new GeneratorModule("Generator", 1, 1);
      let generator2 = new GeneratorModule("Generator", 1, 1);
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
    it("Should be able to collect resources from powered modules", function() {
      let spaceship = new ISpaceship();
      let compartment1 = new Compartment("Compartment 1", 10);
      let compartment2 = new Compartment("Compartment 2", 10);
      let generator = new GeneratorModule("Generator", 1, 10);
      let engine = new EngineModule("Engine", 1, 1);
      let shield = new ShieldModule("Shield", 1, 1);
      expect(spaceship.addCompartment(compartment1)).to.be.true;
      expect(spaceship.addCompartment(compartment2)).to.be.true;
      expect(compartment1.addModule(generator)).to.be.true;
      spaceship.updateResources();
      expect(spaceship.resources.energy).to.equal(10);
      compartment1.addModule(engine);
      compartment2.addModule(shield);
      spaceship.updateResources();
      expect(spaceship.resources.energy).to.equal(8);
      expect(spaceship.resources.shield).to.equal(1);
      expect(spaceship.resources.time).to.equal(1);
      expect(spaceship.resources.food).to.equal(0);
    });
    it("Should be able to partial collect resources from modules", function() {
      // This means some modules are unpowered
      let spaceship = new ISpaceship();
      let compartment1 = new Compartment("Compartment 1", 10);
      let compartment2 = new Compartment("Compartment 2", 10);
      let generator = new GeneratorModule("Generator", 1, 1);
      let engine = new EngineModule("Engine", 1, 1);
      let shield = new ShieldModule("Shield", 1, 1);
      expect(spaceship.addCompartment(compartment1)).to.be.true;
      expect(spaceship.addCompartment(compartment2)).to.be.true;
      expect(compartment1.addModule(generator)).to.be.true;
      spaceship.updateResources();
      expect(spaceship.resources.energy).to.equal(1);
      compartment1.addModule(engine);
      compartment2.addModule(shield);
      spaceship.updateResources();
      expect(spaceship.resources.energy).to.equal(0);
      expect(spaceship.resources.shield).to.equal(0);
      expect(spaceship.resources.time).to.equal(1);
      expect(spaceship.resources.food).to.equal(0);
    });
  });
});
