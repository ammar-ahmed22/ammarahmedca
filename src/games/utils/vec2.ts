import { randInt, random } from "./math";

type RandomOpts = {
  x?: {
    onlyPos?: boolean,
    onlyNeg?: boolean
  },
  y?: {
    onlyPos?: boolean,
    onlyNeg?: boolean
  }
}

export class Vec2{
  constructor(
    public x: number = 0,
    public y: number = 0
  ){}

  
  /**
   * Adds a vector to the current vector
   *
   * @param {Vec2} v Vector to be added
   * @returns {this} 
   */
  public add = (v: Vec2) => {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  /**
   * Subtracts the current vector by another vector
   *
   * @param {Vec2} v Vector to subtract
   * @returns {this}
   */
  public sub = (v: Vec2) => {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  /**
   * Multiplies the vector by a scalar or another vector (element-wise)
   *
   * @public
   * @param {(number | Vec2)} val Vector or scalar to be multiplied by
   * @returns {Vec2}
   */
  public mult(val: number): Vec2
  public mult(val: Vec2): Vec2;

  /**
   * Multiplies the vector by a scalar or another vector (element-wise)
   *
   * @public
   * @param {(number | Vec2)} val Vector or scalar to be multiplied by
   * @returns {Vec2}
   */
  public mult(val: number | Vec2) {
    if (typeof val === "number") {
      this.x *= val;
      this.y *= val;
    } else {
      this.x *= val.x;
      this.y *= val.y;
    }
    return this;
  }

  /**
   * Calculates the angle of the vector
   *
   * @returns {number}
   */
  public heading = () => {
    if (this.x < 0) {
      return Math.atan(this.y / this.x) + Math.PI;
    }
    return Math.atan(this.y / this.x);
  }

  /**
   * Calculates the magnitude of the vector
   *
   * @returns {number}
   */
  public magnitude = () => {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  /**
   * Normalizes the vector (magnitude = 1)
   */
  public normalize = () => {
    const mag = this.magnitude();
    this.x = parseFloat((this.x / mag).toFixed(2));
    this.y = parseFloat((this.y / mag).toFixed(2));
  }

  /**
   * Limits the vectors magnitude
   *
   * @param {number} limiter Amount to limit by
   */
  public limit = (limiter: number) => {
    if (this.magnitude() > limiter) {
      this.setMagnitude(limiter);
    }
  }

  /**
   * Sets the magnitude of the vector while keeping the same direction
   *
   * @param {number} mag Magnitude to be set
   * @returns {this}
   */
  public setMagnitude = (mag: number) => {
    this.normalize();
    this.mult(mag);
    return this;
  }

  /**
   * Checks if the this vector is equal to another
   *
   * @param {Vec2} v Vector
   * @returns {boolean}
   */
  public equals = (v: Vec2): boolean => {
    return (v.x === this.x) && (v.y === this.y);
  }

  /**
   * Returns a copy of the current vector
   *
   * @returns {Vec2}
   */
  public copy = (): Vec2 => {
    return new Vec2(this.x, this.y);
  }

  /**
   * Scales the vector by a random scalar in the range
   * @date 6/27/2023 - 4:51:12 PM
   *
   * @param {number} min Min of the range
   * @param {number} max Max of the range
   */
  public randScale = (min: number, max: number) => {
    const scale = Math.random() * (max - min) + min;
    this.mult(scale);
  }

  /**
   * Checks if the vector is inside given bounds
   *
   * @param {{ min: Vec2, max: Vec2 }} bounds Object containing min and max vectors
   * @param {?{ maxInclusive?: boolean, minInclusive?: boolean }} [opts]
   * @returns {boolean}
   */
  public isInbounds = (bounds: { min: Vec2, max: Vec2 }, opts?: { maxInclusive?: boolean, minInclusive?: boolean }) => {
    let { min, max } = bounds;
    if (opts?.maxInclusive) {
      max = Vec2.ScalarAddition(max, -1)
    }
    if (opts?.minInclusive) {
      min = Vec2.ScalarAddition(min, 1)
    }
    if (this.x < min.x || this.x > max.x || this.y < min.y || this.y > max.y) return false;
    return true;
  }

  /**
   * Rotates a vector by a given angle
   *
   * @param {number} angle
   * @param {?{ degrees?: boolean }} [opts]
   * @returns {Vec2}
   */
  public rotate = (angle: number, opts?: { degrees?: boolean }): Vec2 => {
    const rotateBy = opts?.degrees ? angle * (Math.PI / 180) : angle;
    const newHeading = this.heading() + rotateBy;
    const mag = this.magnitude();
    this.x = Math.cos(newHeading) * mag;
    this.y = Math.sin(newHeading) * mag;
    return this;
  }

  /**
   * Adds a scalar to both x and y of the vector
   *
   * @param {Vec2} v
   * @param {number} scalar
   * @returns {Vec2}
   */
  static ScalarAddition = (v: Vec2, scalar: number) => {
    return new Vec2(v.x + scalar, v.y + scalar);
  }

  /**
   * Creates a randomly generated vector with integer values
   *
   * @param {?{ max?: Vec2, min?: Vec2 }} [opts]
   * @returns {Vec2}
   */
  static RandomInteger = (opts?: { max?: Vec2, min?: Vec2 }) => {
    let min = new Vec2();
    let max = new Vec2(Infinity, Infinity);
    if (opts?.max) {
      max = opts.max;
    }
    if (opts?.min) {
      min = opts.min;
    }

    return new Vec2(randInt(min.x, max.x - 1), randInt(min.y, max.y - 1));
  }

  /**
   * Creates a randomly generated vector with values in the range [-1, 1]
   *
   * @param {?RandomOpts} [opts] Specify to limit the range of x and y to [0, 1], [-1, 0] 
   * @returns {Vec2}
   */
  static Random = (opts?: RandomOpts) => {
    let xAngle = random(0, 2 * Math.PI);
    let yAngle = random(0, 2 * Math.PI);
    if (opts?.x){
      if (opts.x.onlyPos && !opts.x.onlyNeg) xAngle = random(0, (Math.PI / 2))
      if (opts.x.onlyNeg && !opts.x.onlyPos) xAngle = random(Math.PI / 2, (3 * Math.PI) / 2)
    } 

    if (opts?.y) {
      if (opts.y.onlyPos && !opts.y.onlyNeg) yAngle = random(0, Math.PI);
      if (opts.y.onlyNeg && !opts.y.onlyPos) yAngle = random(Math.PI, 2 * Math.PI);
    }
    
    // const angle = Math.random() * (2 * Math.PI);
    return new Vec2(Math.cos(xAngle), Math.sin(yAngle));
  }

  /**
   * Calculates the distance between two vectors
   * @date 6/27/2023 - 4:54:00 PM
   *
   * @param {Vec2} a
   * @param {Vec2} b
   * @returns {number}
   */
  static Distance = (a: Vec2, b: Vec2) => {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  }

  
  /**
   * Returns the subtraction of two vectors, b - a
   *
   * @param {Vec2} a Vector to subtract
   * @param {Vec2} b Vector to be subtracted
   */
  static Subtract = (a: Vec2, b: Vec2) => {
    return new Vec2(b.x - a.x, b.y - a.y);
  }

  /**
   * Returns the addition of two vectors, a + b
   *
   * @param {Vec2} a
   * @param {Vec2} b
   */
  static Add = (a: Vec2, b: Vec2) => {
    return new Vec2(a.x + b.x, a.y + b.y);
  }

  /**
   * Creates a vector from an angle
   *
   * @param {number} angle Angle in radians
   * @returns {Vec2}
   */
  static FromAngle = (angle: number): Vec2 => {
    return new Vec2(Math.cos(angle), Math.sin(angle));
  }

  // static Rotated = (v: Vec2, angle: number, opts?: { degrees: boolean }) => {
  //   const rotateBy = opts?.degrees ? angle * (Math.PI / 180) : angle;
  //   const newHeading = v.heading() + rotateBy;
  //   const mag = v.magnitude();
  //   return new Vec2(Math.cos(newHeading) * mag, Math.sin(newHeading) * mag);
  // }

  static RotateAbout = (about: Vec2, v: Vec2, angle: number, opts?: { degrees: boolean }) => {
    const rotateBy = opts?.degrees ? angle * (Math.PI / 180) : angle;
    const newX = ((v.x - about.x) * Math.cos(rotateBy)) - ((v.y - about.y) * Math.sin(rotateBy)) + about.x;
    const newY = ((v.x - about.x) * Math.sin(rotateBy)) + ((v.y - about.y) * Math.cos(rotateBy)) + about.y;
    return new Vec2(newX, newY);
  }


}