
/**
 * Base class for all resource types
 */
class Resource {
  /**
   * Initialize the resource
   * @param {number} value - The initial amount of the resource
   */
  constructor(value) {
    this.value = value;
  }
}

/**
 * Money resource
 */
export class Money extends Resource {
}

/**
 * Crew resource
 */
export class Crew extends Resource {
}

/**
 * Energy resource
 */
export class Energy extends Resource {
}

/**
 * Food resource
 */
export class Food extends Resource {
}

/**
 * Time resource
 */
export class Time extends Resource {
}
