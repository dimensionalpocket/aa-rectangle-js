'use strict';

module.exports = {segmentCollision};

function segmentCollision (segment1Start, segment1End, segment2Start, segment2End) {
  return segment1End >= segment2Start &&
         segment1Start <= segment2End;
}
