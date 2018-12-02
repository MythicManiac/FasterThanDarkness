import { ISpaceship } from "../engine/spaceship";
import { Compartment } from "../engine/compartment";
import {
  SmallThruster, MediumThruster, GunTurret,
  LargeThruster, LargeGenerator, LifeSupport,
  MediumShield
} from "./modules";


function getLeftRearWing() {
  let compartment = new Compartment("Left Rear Wing", 2);
  compartment.addModule(MediumThruster());
  return compartment;
}

function getRightRearWing() {
  let compartment = new Compartment("Right Rear Wing", 2);
  compartment.addModule(MediumThruster());
  return compartment;
}

function getLeftFrontWing() {
  let compartment = new Compartment("Left Front Wing", 3);
  compartment.addModule(GunTurret());
  compartment.addModule(GunTurret());
  compartment.addModule(SmallThruster());
  return compartment;
}

function getRightFrontWing() {
  let compartment = new Compartment("Right Front Wing", 3);
  compartment.addModule(GunTurret());
  compartment.addModule(GunTurret());
  compartment.addModule(SmallThruster());
  return compartment;
}

function getRear() {
  let compartment = new Compartment("Rear", 4);
  compartment.addModule(LargeThruster());
  return compartment;
}

function getHull() {
  let compartment = new Compartment("Hull", 4);
  compartment.addModule(LargeGenerator());
  return compartment;
}

function getCargoBay() {
  let compartment = new Compartment("Cargo Bay", 6);
  compartment.addModule(LargeGenerator());
  compartment.addModule(LifeSupport());
  compartment.addModule(LifeSupport());
  return compartment;
}

function getCockpit() {
  let compartment = new Compartment("Cockpit", 2);
  compartment.addModule(MediumShield());
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
