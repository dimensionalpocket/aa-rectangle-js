'use strict';

const {segmentsCollide} = require('../lib/collision-helpers');
const expect = require('chai').expect;

describe('CollisionHelpers', function () {

  describe('.segmentsCollide', function () {

    it('returns true if segments touch', function () {
      expect(segmentsCollide(1, 2, 2, 3)).to.equal(true);
      expect(segmentsCollide(2, 3, 1, 2)).to.equal(true);
    });

    it('returns true if segments intersect', function () {
      expect(segmentsCollide(1, 2.5, 2, 3)).to.equal(true);
      expect(segmentsCollide(1.9, 3, 1, 2)).to.equal(true);
    });

    it('returns true if one segment is inside the other', function () {
      expect(segmentsCollide(1, 5, 2, 3)).to.equal(true);
      expect(segmentsCollide(2, 3, 1, 5)).to.equal(true);
    });

    it('returns false if segments do not touch or intersect', function () {
      expect(segmentsCollide(1, 2, 3, 4)).to.equal(false);
      expect(segmentsCollide(3, 4, 1, 2)).to.equal(false);
    });

  });

});
