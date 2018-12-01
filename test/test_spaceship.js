import { Module } from "../src/spaceship/module"
var expect = require("chai").expect;

describe("Module", function() {
  it("Should have a working name property", function() {
    let module = new Module("Test module", 1, 1);
    expect(module.name).to.equal("Test module");
  });
});

describe("Compartment", function() {
});

describe("Spacehsip", function() {
});

