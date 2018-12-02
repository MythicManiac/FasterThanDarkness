import { ISpaceship } from "../engine/spaceship";
import { Compartment } from "../engine/compartment";
import { WeaponModule, EngineModule } from "../engine/module";


function getLeftRearWing() {
  let compartment = new Compartment("Left Rear Wing", 2);
  compartment.addModule(new EngineModule("Medium Thruster", 2, 2, 3));
  return compartment;
}

function getRightRearWing() {
  let compartment = new Compartment("Right Rear Wing", 2);
  compartment.addModule(new EngineModule("Medium Thruster", 2, 2, 3));
  return compartment;
}

function getLeftFrontWing() {
  let compartment = new Compartment("Left Front Wing", 3);
  compartment.addModule(new WeaponModule("Gun Turret", 1, 1, 1));
  compartment.addModule(new WeaponModule("Gun Turret", 1, 1, 1));
  compartment.addModule(new EngineModule("Small Thruster", 1, 1, 1));
  return compartment;
}

function getRightFrontWing() {
  let compartment = new Compartment("Right Front Wing", 3);
  compartment.addModule(new WeaponModule("Gun Turret", 1, 1, 1));
  compartment.addModule(new WeaponModule("Gun Turret", 1, 1, 1));
  compartment.addModule(new EngineModule("Small Thruster", 1, 1, 1));
  return compartment;
}

function getRear() {
  let compartment = new Compartment("Rear", 4);
  compartment.addModule(new EngineModule("Small Thruster", 1, 1, 1));
  return compartment;
}

function getHull() {
  let compartment = new Compartment("Hull", 4);
  return compartment;
}

function getCargoBay() {
  let compartment = new Compartment("Cargo Bay", 6);
  return compartment;
}

function getCockpit() {
  let compartment = new Compartment("Cockpit", 2);
  return compartment;
}


export class Spaceship extends ISpaceship {
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
