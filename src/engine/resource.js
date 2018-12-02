
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
export class Firepower extends Resource { }

/**
 * Shield resource type
 */
export class Shield extends Resource { }


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
    this._resources = new Map();
    resources.forEach(resource => {
      this.add(resource);
    });
  }

  toString() {
    let resources = {};
    this.forEach((resource, resourceClass) => {
      resources[resourceClass.name] = resource.value;
    });
    return JSON.stringify(resources);
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
   * Shield amount
   * @type {number}
   */
  get shield() {
    return this.get(Shield);
  }

  /**
   * forEach going over all the resources in this ResourceCollection
   * @type {Function}
   */
  get forEach() {
    return this._resources.forEach.bind(this._resources);
  }

  /**
   * Adds an amount of a given resource to this collection
   * @param {Resource} resource - The resource to be added
   */
  add(resource) {
    if (this._resources.has(resource.constructor)) {
      this._resources.get(resource.constructor).add(resource);
    } else {
      this.set(resource);
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
   * @param {function(new:Resource)} resourceClass - The resource type's class
   * @returns {number} The resource amount
   */
  get(resourceClass) {
    if (!this._resources.has(resourceClass)) {
      this._resources.set(resourceClass, new resourceClass(0));
    }
    return this._resources.get(resourceClass).value;
  }

  /**
   * Set a resource to the collection
   * @param {*} resource - Resource to be set
   */
  set(resource) {
    let val = new resource.constructor(resource.value); // Copy the object
    this._resources.set(resource.constructor, val);
  }


  /**
   * Checks if this collection is equal with another resource collection
   * @param {ResourceCollection} resourceCollection - The another collection
   */
  isEqual(resourceCollection) {
    let isEqual = true;
    resourceCollection.forEach((resource, resourceClass) => {
      if (this.get(resourceClass) != resource.value) {
        isEqual = false;
      }
    });
    this.forEach((resource, resourceClass) => {
      if (resourceCollection.get(resourceClass) != resource.value) {
        isEqual = false;
      }
    });
    return isEqual;
  }
}
