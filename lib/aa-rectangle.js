'use strict';

const {segmentsCollide} = require('./collision-helpers');

let AARectangleId = 0;

class AARectangle {

  constructor (width, height, x, y) {

    // Config
    this.id = ++AARectangleId;

    // Positioning
    this.x = x;
    this.y = y;
    this.globalX = 0;
    this.globalY = 0;
    this.translateX = 0;
    this.translateY = 0;

    // Dimensions
    this.width = width;
    this.height = height;

    // Hierarchy
    this.parent = null;

    // Orientation
    this.orientationX = 1;
    this.orientationY = 1;

  }

  get width () {
    return this._width;
  }

  set width (value) {
    this._width = parseDimensionValue(value);
  }

  get height () {
    return this._height;
  }

  set height (value) {
    this._height = parseDimensionValue(value);
  }

  get x () {
    return this._x;
  }

  set x (value) {
    this._x = value || 0;
  }

  get y () {
    return this._y;
  }

  set y (value) {
    this._y = value || 0;
  }

  update () {
    let globalX = 0;
    let globalY = 0;
    let current = this;
    while (current) {
      globalX *= current.orientationX;
      globalY *= current.orientationY;
      globalX += current._x;
      globalY += current._y;
      current = current.parent;
      if (current) { // only parent translations affects main object coordinates
        globalX += current.translateX * current.orientationX;
        globalY += current.translateY * current.orientationY;
      }
    }
    this.globalX = globalX;
    this.globalY = globalY;
    const halfX = this._width / 2;
    const extraX = this.translateX * this.orientationX;
    this.globalX1 = globalX - halfX + extraX;
    this.globalX2 = globalX + halfX + extraX;
    const halfY = this._height / 2;
    const extraY = this.translateY * this.orientationY;
    this.globalY1 = globalY - halfY + extraY;
    this.globalY2 = globalY + halfY + extraY;
  }

  add (box) {
    box.parent = this;
  }

  flipX () {
    this.orientationX = -1;
  }

  unflipX () {
    this.orientationX = 1;
  }

  flipY () {
    this.orientationY = -1;
  }

  unflipY () {
    this.orientationY = 1;
  }

  collides (box) {
    this.update();
    box.update();

    const collidesInX = segmentsCollide(
      this.globalX1, this.globalX2,
      box.globalX1, box.globalX2
    );
    if (!collidesInX) {
      return false;
    }
    const collidesInY = segmentsCollide(
      this.globalY1, this.globalY2,
      box.globalY1, box.globalY2
    );
    return collidesInY;
  }

}

function parseDimensionValue (value) {
  let newValue = value || 1;
  if (newValue < 0) {
    newValue = 0;
  }
  return newValue;
}

module.exports = AARectangle;
