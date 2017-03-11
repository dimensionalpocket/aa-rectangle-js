'use strict';

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

  // get x1 () {
  //   return this._x - (this._width / 2) + (this.translateX * this.orientationX);
  // }

  // get x2 () {
  //   return this._x + (this._width / 2) + (this.translateX * this.orientationX);
  // }

  set x (value) {
    this._x = value || 0;
  }

  get y () {
    return this._y;
  }

  // get y1 () {
  //   return this._y - (this._height / 2) + (this.translateY * this.orientationY);
  // }

  // get y2 () {
  //   return this._y + (this._height / 2) + (this.translateY * this.orientationY);
  // }

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
    this.globalX1 = globalX - (this._width / 2) + (this.translateX * this.orientationX);
    this.globalX2 = globalX + (this._width / 2) + (this.translateX * this.orientationX);
    this.globalY1 = globalY - (this._height / 2) + (this.translateY * this.orientationY);
    this.globalY2 = globalY + (this._height / 2) + (this.translateY * this.orientationY);
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

// Helpers

function segmentsCollide (segment1_start, segment1_end, segment2_start, segment2_end) {
  return segment1_end >= segment2_start &&
         segment1_start <= segment2_end;
}

function parseDimensionValue (value) {
  let newValue = value || 1;
  if (newValue < 0) {
    newValue = 0;
  }
  return newValue;
}

module.exports = AARectangle;
