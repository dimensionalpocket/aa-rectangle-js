# AARectangle - Axis-Aligned Rectangle

[![Code Climate](https://lima.codeclimate.com/github/pauloddr/aa-rectangle-javascript/badges/gpa.svg)](https://lima.codeclimate.com/github/pauloddr/aa-rectangle-javascript)
[![Test Coverage](https://lima.codeclimate.com/github/pauloddr/aa-rectangle-javascript/badges/coverage.svg)](https://lima.codeclimate.com/github/pauloddr/aa-rectangle-javascript/coverage)
[![Issue Count](https://lima.codeclimate.com/github/pauloddr/aa-rectangle-javascript/badges/issue_count.svg)](https://lima.codeclimate.com/github/pauloddr/aa-rectangle-javascript)
[![Build Status](https://semaphoreci.com/api/v1/pauloddr/aa-rectangle-javascript/branches/master/shields_badge.svg)](https://semaphoreci.com/pauloddr/aa-rectangle-javascript)

```javascript
var box = new AARectangle(width, height, x, y);
```

This is a JavaScript implementation of a 2D Axis-Aligned Rectangle with the following additional features:

* Hierarchy (add boxes inside boxes);
* Horizontal and vertical flipping;
* Translation along X or Y axis;
* Global positioning based on all of the above.

__This is a work in progress.__

Attributes:

* `width` - box width.
* `height` - box height.
* `x` - the X coordinate of the pivot, relative to the parent.
* `y` - the Y coordinate of the pivot, relative to the parent.
* `globalX` - the X coordinate of the pivot, relative to the world. Populated after calling `update`.
* `globalY` - the Y coordinate of the pivot, relative to the world. Populated after calling `update`.
* `translateX` - used to move the box along the X axis without changing its pivot.
* `translateY` - used to move the box along the Y axis without changing its pivot.
* `parent` - an instance of another box where this instance is contained inside.

Methods:

* `update` - updates global coordinates.
* `add(box)` - adds another box as a child instance.
* `flipX` - flips this box horizontally.
* `flipY` - flips this box vertically.
* `unflipX` - unflips this box horizontally.
* `unflipY` - unflips this box vertically.
* `collides(box)` - returns `true` if this instance collides with the given box.

Examples:

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

## License

MIT
