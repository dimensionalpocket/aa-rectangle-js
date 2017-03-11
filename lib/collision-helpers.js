'use strict';

module.exports = {segmentsCollide};

function segmentsCollide (segment1_start, segment1_end, segment2_start, segment2_end) {
  return segment1_end >= segment2_start &&
         segment1_start <= segment2_end;
}
