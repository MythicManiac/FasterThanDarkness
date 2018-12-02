
/**
 * Base class for all resource types
 */
class Resource {
  /**
   * Initialize the resource
   * @param {number} value - The initial amount of the resource
   */
  constructor(value) {
    this._value = value;
  }

  /**
   * The current value of this resource
   * @type {number}
   */
  get value() {
    return this._value;
  }

  /**
   * Adds another resource of the same type to this resource
   * @param {Resource} resource - The resource to be added
   */
  add(resource) {
    if (resource.constructor != this.constructor) {
      let attempt = resource.constructor.name;
      let correct = this.constructor.name;
      throw new Error(`Can't add ${attempt} to ${correct}`);
    }
    this._value += resource.value;
  }

  /**
   * Substracts another resource of the same type from this resource
   * @param {Resource} resource - The resource to be substracted
   */
  substract(resource) {
    if (resource.constructor != this.constructor) {
      let attempt = resource.constructor.name;
      let correct = this.constructor.name;
      throw new Error(`Can't substract ${attempt} from ${correct}`);
    }
    this._value -= resource.value;
  }
}

/**
 * Money resource type
 */
export class Money extends Resource { }

/**
 * Crew resource type
 */
export class Crew extends Resource { }

/**
 * Energy resource type
 */
export class Energy extends Resource { }

/**
 * Food resource type
 */
export class Food extends Resource { }

/**
 * Time resource type
 */
export class Time extends Resource { }

/**
 * Firepower resource type
 */
export class Firepower extends Resource {}


/**
 * ResourceCollection is a container for all resource types which allows for
 * easy management.
 */
export class ResourceCollection {

  /**
   * Instantiates a new resource collection
   * @param {...Resource} resources
   */
  constructor(...resources) {
    this.resources = new Map();
    if (resources) {
      resources.forEach(resource => {
        this.add(resource);
      });
    }
  }

  /**
   * Food amount
   * @type {number}
   */
  get food() {
    return this.get(Food);
  }

  /**
   * Time amount
   * @type {number}
   */
  get time() {
    return this.get(Time);
  }

  /**
   * Energy amount
   * @type {number}
   */
  get energy() {
    return this.get(Energy);
  }

  /**
   * Crew amount
   * @type {number}
   */
  get crew() {
    return this.get(Crew);
  }

  /**
   * Money amount
   * @type {number}
   */
  get money() {
    return this.get(Money);
  }

  /**
   * Firepower amount
   * @type {number}
   */
  get firepower() {
    return this.get(Firepower);
  }

  /**
   * forEach going over all the resources in this ResourceCollection
   * @type {Function}
   */
  get forEach() {
    return this.resources.forEach;
  }

  /**
   * Adds an amount of a given resource to this collection
   * @param {Resource} resource - The resource to be added
   */
  add(resource) {
    if (this.resources.has(resource.constructor)) {
      this.resources.get(resource.constructor).add(resource);
    } else {
      let val = new resource.constructor(resource.value); // Copy the object
      this.resources.set(resource.constructor, val);
    }
  }

  /**
   * Adds all resources from another ResourceCollection to this collection
   * @param {ResourceCollection} resourceCollection
   */
  addFromCollection(resourceCollection) {
    resourceCollection.forEach(resource => {
      this.add(resource);
    });
  }

  /**
   * Substract an amount of a given resource from this collection
   * @param {Resource} resource - The resource to be substracted
   */
  substract(resource) {
    this.add(new resource.constructor(-resource.value));
  }

  /**
   * Substracts all resources of another ResourceCollection from this collection
   * @param {ResourceCollection} resourceCollection
   */
  substractFromCollection(resourceCollection) {
    resourceCollection.forEach(resource => {
      this.substract(resource);
    });
  }

  /**
   * Get the current amount of a type of resource.
   * @param {typeof Resource} resourceClass - The resource type
   * @returns {number} The resource amount
   */
  get(resourceClass) {
    if (!this.resources.has(resourceClass)) {
      this.resources.set(resourceClass, new resourceClass(0));
    }
    return this.resources.get(resourceClass).value;
  }
}
