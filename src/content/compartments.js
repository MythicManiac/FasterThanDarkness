import { Compartment } from "../engine/compartment";
import {
  SmallThruster, MediumThruster, GunTurret,
  LargeThruster, LargeGenerator, LifeSupport,
  MediumShield
} from "./modules";


export function LeftRearWing() {
  let compartment = new Compartment("Left Rear Wing", 2);
  compartment.addModule(MediumThruster());
  return compartment;
}

export function RightRearWing() {
  let compartment = new Compartment("Right Rear Wing", 2);
  compartment.addModule(MediumThruster());
  return compartment;
}

export function LeftFrontWing() {
  let compartment = new Compartment("Left Front Wing", 3);
  compartment.addModule(GunTurret());
  compartment.addModule(GunTurret());
  compartment.addModule(SmallThruster());
  return compartment;
}

export function RightFrontWing() {
  let compartment = new Compartment("Right Front Wing", 3);
  compartment.addModule(GunTurret());
  compartment.addModule(GunTurret());
  compartment.addModule(SmallThruster());
  return compartment;
}

export function Rear() {
  let compartment = new Compartment("Rear", 4);
  compartment.addModule(LargeThruster());
  return compartment;
}

export function Hull() {
  let compartment = new Compartment("Hull", 4);
  compartment.addModule(LargeGenerator());
  return compartment;
}

export function CargoBay() {
  let compartment = new Compartment("Cargo Bay", 6);
  compartment.addModule(LargeGenerator());
  compartment.addModule(LifeSupport());
  compartment.addModule(LifeSupport());
  return compartment;
}

export function Cockpit() {
  let compartment = new Compartment("Cockpit", 2);
  compartment.addModule(MediumShield());
  return compartment;
}
