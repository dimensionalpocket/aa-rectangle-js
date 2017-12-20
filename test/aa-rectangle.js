'use strict'

const AARectangle = require('../lib/aa-rectangle')
const expect = require('chai').expect
const now = require('performance-now')

describe('AARectangle', function () {
  describe('constructor', function () {
    it('initializes with default options', function () {
      let box = new AARectangle()
      expect(box.width).to.equal(1)
      expect(box.height).to.equal(1)
      expect(box.x).to.equal(0)
      expect(box.y).to.equal(0)
    })

    it('initializes with given options', function () {
      let box = new AARectangle(1, 2, 3, 4)
      expect(box.width).to.equal(1)
      expect(box.height).to.equal(2)
      expect(box.x).to.equal(3)
      expect(box.y).to.equal(4)
    })
  })

  describe('#add', function () {
    let parent = new AARectangle()
    let child = new AARectangle()
    parent.add(child)

    it('sets parent box', function () {
      expect(child.parent).to.equal(parent)
    })
  })

  describe('#width/height', function () {
    it('converts negative values to zero', function () {
      let box = new AARectangle(-10, -20, 0, 0)
      expect(box.width).to.equal(0)
      expect(box.height).to.equal(0)
    })
  })

  describe('#update', function () {
    let box1 = new AARectangle(1, 1, 0, 0)
    let box2 = new AARectangle(2, 2, 10, -20)
    let box3 = new AARectangle(3, 3, -2, 4)
    let box4 = new AARectangle(4, 4, 4, -8)
    let box5 = new AARectangle(5, 5, 2, -2)
    box1.add(box2)
    box2.add(box3)
    box3.add(box4)
    box4.add(box5)

    it('runs for less than 10 nanoseconds', function () {
      let box2 = new AARectangle(2, 2, 10, -20)
      let box3 = new AARectangle(3, 3, -2, 4)
      this.retries(10) // allows engine to optimize
      box2.flipX()
      box3.flipY()
      let time1, time2, i
      for (i = 0; i < 10; ++i) {
        time1 = now()
        box4.update()
        time2 = now()
        expect(time2 - time1).to.be.at.most(0.01)
      }
      box2.unflipX()
      box3.unflipY()
    })

    it('sets globals without orientation or translation', function () {
      box1.update()
      expect(box1.globalX).to.equal(0)
      expect(box1.globalY).to.equal(0)
      box2.update()
      expect(box2.globalX).to.equal(10)
      expect(box2.globalY).to.equal(-20)
      box3.update()
      expect(box3.globalX).to.equal(8)
      expect(box3.globalY).to.equal(-16)
      box4.update()
      expect(box4.globalX).to.equal(12)
      expect(box4.globalY).to.equal(-24)
      box5.update()
      expect(box5.globalX).to.equal(14)
      expect(box5.globalY).to.equal(-26)
    })

    it('sets globals with translation', function () {
      box1.translateX = 1
      box1.translateY = -1
      box1.update()
      expect(box1.globalX).to.equal(0)
      expect(box1.globalY).to.equal(0)
      box2.translateX = 2
      box2.translateY = -2
      box2.update()
      expect(box2.globalX).to.equal(11)
      expect(box2.globalY).to.equal(-21)
      box3.translateX = 3
      box3.translateY = -3
      box3.update()
      expect(box3.globalX).to.equal(11)
      expect(box3.globalY).to.equal(-19)
      box4.translateX = 4
      box4.translateY = -4
      box4.update()
      expect(box4.globalX).to.equal(18)
      expect(box4.globalY).to.equal(-30)
      box5.update()
      expect(box5.globalX).to.equal(24)
      expect(box5.globalY).to.equal(-36)
      box1.translateX = 0
      box1.translateY = 0
      box2.translateX = 0
      box2.translateY = 0
      box3.translateX = 0
      box3.translateY = 0
      box4.translateX = 0
      box4.translateY = 0
      box5.translateX = 0
      box5.translateY = 0
    })

    it('sets globals with orientation and translation', function () {
      box1.translateX = 1
      box1.translateY = -1
      box2.flipX()
      box2.update()
      expect(box2.globalX).to.equal(11)
      expect(box2.globalY).to.equal(-21)
      box3.update()
      expect(box3.globalX).to.equal(13)
      expect(box3.globalY).to.equal(-17)
      box4.update()
      expect(box4.globalX).to.equal(9)
      expect(box4.globalY).to.equal(-25)
      box5.flipX()
      box5.update()
      expect(box5.globalX).to.equal(7)
      expect(box5.globalY).to.equal(-27)
      box2.unflipX()
      box5.unflipX()
      box1.translateX = 0
      box1.translateY = 0
    })

    it('sets segments (X1-X2/Y1-Y2) according to width/height and translation', function () {
      box1.update()
      expect(box1.globalX1).to.equal(-0.5)
      expect(box1.globalX2).to.equal(0.5)
      expect(box1.globalY1).to.equal(-0.5)
      expect(box1.globalY2).to.equal(0.5)
      box2.update()
      expect(box2.globalX1).to.equal(9)
      expect(box2.globalX2).to.equal(11)
      expect(box2.globalY1).to.equal(-21)
      expect(box2.globalY2).to.equal(-19)
      box2.translateX = 1
      box2.update()
      expect(box2.globalX1).to.equal(10)
      expect(box2.globalX2).to.equal(12)
      box1.translateX = 1
      box2.update()
      expect(box2.globalX1).to.equal(11)
      expect(box2.globalX2).to.equal(13)
    })
  })

  describe('#collision', function () {
    it('returns true if a box is completely inside another', function () {
      let box1 = new AARectangle(100, 100, 1, 1)
      let box2 = new AARectangle(2, 2, -40, -40)
      expect(box1.collision(box2)).to.equal(true)
    })

    it('returns true if sides and bases touch', function () {
      let box1 = new AARectangle(2, 2, 1, 1)
      let box2 = new AARectangle(2, 2, -1, -1)
      expect(box1.collision(box2)).to.equal(true)
    })

    it('returns false if bases touch but sides do not', function () {
      let box1 = new AARectangle(2, 2, 3, 1)
      let box2 = new AARectangle(2, 2, -1, -1)
      expect(box1.collision(box2)).to.equal(false)
    })

    it('returns false if sides touch but bases do not', function () {
      let box1 = new AARectangle(2, 2, 1, 3)
      let box2 = new AARectangle(2, 2, -1, -1)
      expect(box1.collision(box2)).to.equal(false)
    })

    describe('with parent', function () {
      it('returns true if box is dragged towards another by parent position', function () {
        let parent = new AARectangle(0, 0, 0, 2)
        let box1 = new AARectangle(2, 2, 1, 3)
        let box2 = new AARectangle(2, 2, -1, -1)
        expect(box1.collision(box2)).to.equal(false)
        parent.add(box2) // parent position will bring box2 closer to box1
        expect(box1.collision(box2)).to.equal(true)
      })

      it('returns true if box is dragged towards another by parent translation', function () {
        let parent = new AARectangle(0, 0, 0, 0)
        let box1 = new AARectangle(2, 2, 1, 3)
        let box2 = new AARectangle(2, 2, -1, -1)
        expect(box1.collision(box2)).to.equal(false)
        parent.add(box2)
        expect(box1.collision(box2)).to.equal(false)
        parent.translateY = 2 // parent translation will bring box2 closer to box1
        expect(box1.collision(box2)).to.equal(true)
      })
    })
  })
})
