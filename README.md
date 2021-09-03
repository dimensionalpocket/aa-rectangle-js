# @dimensionalpocket/aa-rectangle

[![build](https://github.com/dimensionalpocket/aa-rectangle-js/actions/workflows/node.js.yml/badge.svg)](https://github.com/dimensionalpocket/aa-rectangle-js/actions/workflows/node.js.yml) [![Total alerts](https://img.shields.io/lgtm/alerts/g/dimensionalpocket/aa-rectangle-js.svg)](https://lgtm.com/projects/g/dimensionalpocket/aa-rectangle-js/alerts/) [![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/dimensionalpocket/aa-rectangle-js.svg)](https://lgtm.com/projects/g/dimensionalpocket/aa-rectangle-js/context:javascript)

```javascript
var box = new AARectangle(width, height, x, y);
```

This is a JavaScript implementation of an [Axis-Aligned](https://en.wikipedia.org/wiki/Axis-aligned_object) Rectangle with extended features.

It is tailored for usage in 2D games that require a box management system, for handling things such as scrolling stages, hitboxes/hurtboxes, etc.

## Features

* Hierarchy: add boxes inside boxes
* Horizontal and vertical flipping
* Translation along X or Y axis
* Global positioning based on all of the above

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

## Installation

Install the package directly from GitHub (X.Y.Z == release tag):

```shell
npm i -S -E github:dimensionalpocket/aa-rectangle-js#X.Y.Z
```

## License

MIT
