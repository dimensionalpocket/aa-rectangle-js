'use strict';

const {segmentCollision} = require('../lib/collision-helpers');
const expect = require('chai').expect;

describe('CollisionHelpers', function () {

  describe('.segmentCollision', function () {

    it('returns true if segments touch', function () {
      expect(segmentCollision(1, 2, 2, 3)).to.equal(true);
      expect(segmentCollision(2, 3, 1, 2)).to.equal(true);
    });

    it('returns true if segments intersect', function () {
      expect(segmentCollision(1, 2.5, 2, 3)).to.equal(true);
      expect(segmentCollision(1.9, 3, 1, 2)).to.equal(true);
    });

    it('returns true if one segment is inside the other', function () {
      expect(segmentCollision(1, 5, 2, 3)).to.equal(true);
      expect(segmentCollision(2, 3, 1, 5)).to.equal(true);
    });

    it('returns false if segments do not touch or intersect', function () {
      expect(segmentCollision(1, 2, 3, 4)).to.equal(false);
      expect(segmentCollision(3, 4, 1, 2)).to.equal(false);
    });

  });

});
