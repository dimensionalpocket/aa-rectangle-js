# AARectangle

[![Build Status](https://semaphoreci.com/api/v1/pauloddr/aa-rectangle-javascript/branches/master/shields_badge.svg)](https://semaphoreci.com/pauloddr/aa-rectangle-javascript)
[![Test Coverage](https://lima.codeclimate.com/github/pauloddr/aa-rectangle-javascript/badges/coverage.svg)](https://lima.codeclimate.com/github/pauloddr/aa-rectangle-javascript/coverage)
[![Code Climate](https://lima.codeclimate.com/github/pauloddr/aa-rectangle-javascript/badges/gpa.svg)](https://lima.codeclimate.com/github/pauloddr/aa-rectangle-javascript)
[![Issue Count](https://lima.codeclimate.com/github/pauloddr/aa-rectangle-javascript/badges/issue_count.svg)](https://lima.codeclimate.com/github/pauloddr/aa-rectangle-javascript)

```javascript
var box = new AARectangle(width, height, x, y);
```

This is a JavaScript implementation of an [Axis-Aligned](https://en.wikipedia.org/wiki/Axis-aligned_object) Rectangle with extended features.

It is tailored for usage in 2D games that require a box management system, for handling things such as scrolling stages, hitboxes/hurtboxes, etc.

## Features

* Hierarchy: add boxes inside boxes;
* Horizontal and vertical flipping;
* Translation along X or Y axis;
* Global positioning based on all of the above.

### What about Rotation?

Axis-aligned objects do not rotate by design. This allows for much faster and easier collision algorithms.

See this [wikipedia article](https://en.wikipedia.org/wiki/Axis-aligned_object) for details on axis-aligned objects.

## Properties

### `x` and `y`

Set/get the pivot position of the box.

Change these properties to move the box around.

If a `parent` is defined, positioning will be relative to the parent.

### `width` and `height`

Set/get the box dimensions. They will stretch evenly around the pivot.

### `globalX` and `globalY`

These getters return the X and Y coordinates relative to the world.

They are populated after calling `update()`.

### `translateX` and `translateY`

Set these properties to define how far the box is moved along the X/Y axis, without changing its pivot.

Changing these properties affects the behavior of flipping mechanics. They are not intended to be used for moving the box (set `x`/`y` instead).

### `parent`

Returns another box where this instance is contained into.

For setting a parent, refer to the `add()` method.

## Methods

### `add(box)`

Adds another box as a child instance.

### `update`

Updates `globalX` and `globalY` properties, moving up the parent tree and handling parent positioning accordingly.

### `flipX`/`flipY`

Flips the box horizontally or vertically. They do not act as a toggle.

Affects calculation of global coordinates when `update` is called.

### `unflipX`/`unflipY`

Resets the horizontal/vertical orientation of the box.

### `collision(anotherBox)`

Returns `true` if the box collides with `anotherBox`.

Automatically calls `update` on both boxes to fetch correct global coordinates.

## Examples

```javascript
var box1 = new AARectangle(1, 1,  0,   0);
var box2 = new AARectangle(1, 1, 10, -20);
var box3 = new AARectangle(1, 1, -2,   4);
box1.add(box2);
box1.update();
console.log(box1.globalX); // 0
console.log(box1.globalY); // 0
box2.update();
console.log(box2.globalX); // 10 (10+0)
console.log(box2.globalY); // -20 (-20+0)
box3.update();
console.log(box3.globalX); // 8 (-2+10+0)
console.log(box3.globalY); // -16 (4-20-0)
```

## TODO/Wishlist

* Viewport methods to return the visible area of a box, when it's larger than its parent box, or is moved out of the bounds of the parent.
* Browserify support to allow component usage in browsers.

## License

MIT
