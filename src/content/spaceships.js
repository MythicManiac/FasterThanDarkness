import { ISpaceship } from "../engine/spaceship";
import {
  LeftFrontWing, LeftRearWing, RightFrontWing, RightRearWing,
  Rear, Hull, CargoBay, Cockpit
} from "./compartments";

export class Spaceship extends ISpaceship {
  constructor() {
    super();
  }

  initializeModules() {
    this.addCompartment(Cockpit());
    this.addCompartment(Hull());
    this.addCompartment(CargoBay());
    this.addCompartment(Rear());
    this.addCompartment(LeftRearWing());
    this.addCompartment(RightRearWing());
    this.addCompartment(LeftFrontWing());
    this.addCompartment(RightFrontWing());
  }
}
