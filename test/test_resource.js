import {
  Energy, Crew, Food, Shield,
  Money, Time, ResourceCollection, Firepower
} from "../src/spaceship/resource";

import { expect } from "chai";
import { isRegExp } from "util";


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
      new Food(3),
      new Firepower(2),
      new Firepower(3)
    );
    expect(collection.energy).to.equal(5);
    expect(collection.money).to.equal(8);
    expect(collection.food).to.equal(3);
    expect(collection.firepower).to.equal(5); // 3 + 2
    expect(collection.time).to.equal(0);
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
    collection.add(new Shield(12));
    expect(collection.energy).to.equal(4);
    expect(collection.money).to.equal(10);
    expect(collection.firepower).to.equal(3);
    expect(collection.time).to.equal(2);
    expect(collection.crew).to.equal(8);
    expect(collection.food).to.equal(1);
    expect(collection.shield).to.equal(12);
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
  it("Should be able to loop over resources", function() {
    let collection = new ResourceCollection(
      new Energy(1),
      new Food(2),
      new Money(3)
    );
    let newCollection = new ResourceCollection();
    collection.forEach(resource => {
      newCollection.add(resource);
    });
    expect(collection.isEqual(newCollection)).to.be.true;
  });
  it("Should be able to add another collection with itself", function() {
    let collection1 = new ResourceCollection(
      new Energy(1),
      new Food(2),
      new Money(3)
    );
    let collection2 = new ResourceCollection(
      new Energy(4),
      new Food(5),
      new Money(6)
    );
    collection1.addFromCollection(collection2);
    expect(collection1.energy).to.equal(5);
    expect(collection1.food).to.equal(7);
    expect(collection1.money).to.equal(9);
    expect(collection2.energy).to.equal(4);
    expect(collection2.food).to.equal(5);
    expect(collection2.money).to.equal(6);
  });
  it("Should be able to substract another collection from itself", function() {
    let collection1 = new ResourceCollection(
      new Energy(1),
      new Food(2),
      new Money(3)
    );
    let collection2 = new ResourceCollection(
      new Energy(4),
      new Food(5),
      new Money(6)
    );
    collection1.substractFromCollection(collection2);
    expect(collection1.energy).to.equal(-3);
    expect(collection1.food).to.equal(-3);
    expect(collection1.money).to.equal(-3);
    expect(collection2.energy).to.equal(4);
    expect(collection2.food).to.equal(5);
    expect(collection2.money).to.equal(6);
  });
  it("Should be able to check equality with another collection", function(){
    let collection1 = new ResourceCollection(
      new Energy(1),
      new Food(2)
    );
    let collection2 = new ResourceCollection(
      new Energy(1),
      new Food(2)
    );
    expect(collection1.isEqual(collection2)).to.be.true;
    expect(collection2.isEqual(collection1)).to.be.true;
    let collection3 = new ResourceCollection(
      new Energy(1),
      new Food(2),
      new Time(0)
    );
    expect(collection1.isEqual(collection3)).to.be.true;
    expect(collection2.isEqual(collection3)).to.be.true;
    collection3.add(new Energy(1));
    expect(collection3.energy).to.equal(2);
    expect(collection1.energy).to.equal(1);
    expect(collection1.isEqual(collection3)).to.be.false;
    expect(collection2.isEqual(collection3)).to.be.false;
    expect(collection3.isEqual(collection3)).to.be.true;
  });
});
