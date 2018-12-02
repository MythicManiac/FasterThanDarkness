import {
  Energy, Crew, Food,
  Money, Time, ResourceCollection, Firepower
} from "../src/spaceship/resource";

import { expect } from "chai";


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
  it("Should be able to initialize with given resources", function() {
    let collection = new ResourceCollection(
      new Energy(5),
      new Money(8),
      new Food(3)
    );
    expect(collection.energy).to.equal(5);
    expect(collection.money).to.equal(8);
    expect(collection.food).to.equal(3);
  });
  it("Should be able to add and get different resource types", function() {
    let collection = new ResourceCollection();
    expect(collection.get(Energy)).to.equal(0);
    collection.add(new Energy(1));
    expect(collection.get(Energy)).to.equal(1);
    expect(collection.get(Money)).to.equal(0);
    collection.add(new Money(30));
    expect(collection.get(Money)).to.equal(30);
    expect(collection.get(Energy)).to.equal(1);
  });
  it("Should have functional resource properties", function() {
    let collection = new ResourceCollection();
    collection.add(new Energy(4));
    collection.add(new Money(10));
    collection.add(new Firepower(3));
    collection.add(new Time(2));
    collection.add(new Crew(8));
    collection.add(new Food(1));
    expect(collection.energy).to.equal(4);
    expect(collection.money).to.equal(10);
    expect(collection.firepower).to.equal(3);
    expect(collection.time).to.equal(2);
    expect(collection.crew).to.equal(8);
    expect(collection.food).to.equal(1);
  });
  it("Should be able to substract from resources", function() {
    let collection = new ResourceCollection();
    collection.add(new Energy(10));
    expect(collection.energy).to.equal(10);
    collection.add(new Energy(5));
    expect(collection.energy).to.equal(15);
    collection.substract(new Energy(3));
    expect(collection.energy).to.equal(12);
    collection.substract(new Money(5));
    expect(collection.money).to.equal(-5);
  });
});
