import { Module } from "../src/spaceship/module";
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
  });
});
