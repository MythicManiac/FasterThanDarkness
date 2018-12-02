import {
  Energy, Crew, Food,
  Money, Time, ResourceCollection
} from "../src/spaceship/resource"

var expect = require("chai").expect;

describe("Resources", function() {
  it("Should be able to initialize with a given value", function() {
    let resource = new Energy(1);
    expect(resource.value).to.equal(1);
    resource = new Crew(5);
    expect(resource.value).to.equal(5);
    resource = new Food(10);
    expect(resource.value).to.equal(10);
    resource = new Money(7);
    expect(resource.value).to.equal(7);
    resource = new Time(12);
    expect(resource.value).to.equal(12);
  });
  it("Should be able to add on it's value", function() {
    let resource = new Energy(1);
    let resource2 = new Energy(1);
    expect(resource.value).to.equal(1);
    resource.add(resource2);
    expect(resource.value).to.equal(2);
  });
  it("Should be able to substract from it's value", function() {
    let resource = new Energy(9);
    let resource2 = new Energy(2);
    expect(resource.value).to.equal(9);
    resource.substract(resource2);
    expect(resource.value).to.equal(7);
  });
  it("Should not be able to add different resource type", function() {
    let resource = new Energy(1);
    let resource2 = new Money(1);
    let addition = resource.add.bind(resource, resource2);
    expect(addition).to.throw("Can't add Money to Energy");
  });
  it("Should not be able to substract different resource type", function()  {
    let resource = new Energy(1);
    let resource2 = new Money(1);
    let substraction = resource.substract.bind(resource, resource2);
    expect(substraction).to.throw("Can't substract Money from Energy");
  });
});

describe("ResourceCollection", function() {
});
