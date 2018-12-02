import { Spaceship } from "../spaceship/spaceship";
import { Compartment } from "../spaceship/compartment";


function getLeftRearWing() {
  let compartment = new Compartment("Left Rear Wing", 2);
  return compartment;
}

function getRightRearWing() {
  let compartment = new Compartment("Right Rear Wing", 2);
  return compartment;
}

function getLeftFrontWing() {
  let compartment = new Compartment("Left Front Wing", 3);
  return compartment;
}

function getRightFrontWing() {
  let compartment = new Compartment("Right Front Wing", 3);
  return compartment;
}

function getRear() {
  let compartment = new Compartment("Rear", 5);
  return compartment;
}

function getHull() {
  let compartment = new Compartment("Hull", 7);
  return compartment;
}

function getCargoBay() {
  let compartment = new Compartment("Cargo Bay", 10);
  return compartment;
}

function getCockpit() {
  let compartment = new Compartment("Cockpit");
  return compartment;
}


export class PlayerSpaceship extends Spaceship {
  constructor() {
    super();
  }

  initializeModules() {
    this.addCompartment(getLeftRearWing());
    this.addCompartment(getRightRearWing());
    this.addCompartment(getLeftFrontWing());
    this.addCompartment(getRightFrontWing());
    this.addCompartment(getRear());
    this.addCompartment(getHull());
    this.addCompartment(getCargoBay());
    this.addCompartment(getCockpit());
  }
}
