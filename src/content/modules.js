import { WeaponModule, EngineModule, LifeSupportModule, GeneratorModule, ShieldModule } from "../engine/module";


export function SmallThruster() {
  return new EngineModule("Small Thruster", 1, 1, 1);
}

export function MediumThruster() {
  return new EngineModule("Medium Thruster", 2, 2, 3);
}

export function LargeThruster() {
  return new EngineModule("Large Thruster", 4, 3, 5);
}

export function GunTurret() {
  return new WeaponModule("Gun Turret", 1, 1, 1);
}

export function LifeSupport() {
  return new LifeSupportModule("Life Support", 1, 1, 1);
}

export function SmallGenerator() {
  return new GeneratorModule("Small Generator", 1, 2);
}

export function MediumGenerator() {
  return new GeneratorModule("Medium Generator", 2, 5);
}

export function LargeGenerator() {
  return new GeneratorModule("Large Generator", 4, 12);
}

export function SmallShield() {
  return new ShieldModule("Small Shield", 1, 1, 2);
}

export function MediumShield() {
  return new ShieldModule("Medium Shield", 2, 2, 4);
}

export function LargeShield() {
  return new ShieldModule("Large Shield", 4, 4, 8);
}

export const MODULE_GENERATORS = [
  SmallThruster,
  MediumThruster,
  LargeThruster,
  GunTurret,
  LifeSupport,
  SmallGenerator,
  MediumGenerator,
  LargeGenerator,
  SmallShield,
  MediumShield,
  LargeShield
];
