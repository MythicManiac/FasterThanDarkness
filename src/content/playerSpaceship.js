import { Spaceship } from "../spaceship/spaceship";
import { Compartment } from "../spaceship/compartment";


export class PlayerSpaceship extends Spaceship {
  constructor() {
    super();
    this.addCompartment(new Compartment("Left Rear Wing", 2));
    this.addCompartment(new Compartment("Right Rear Wing", 2));
    this.addCompartment(new Compartment("Left Front Wing", 3));
    this.addCompartment(new Compartment("Right Front Wing", 3));
    this.addCompartment(new Compartment("Rear", 5));
    this.addCompartment(new Compartment("Hull", 7));
    this.addCompartment(new Compartment("Cargo Bay", 10));
    this.addCompartment(new Compartment("Cockpit"));
  }
}
