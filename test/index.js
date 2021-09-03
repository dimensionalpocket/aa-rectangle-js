// @ts-check

'use strict'

const { expect } = require('@dimensionalpocket/development')

const AARectangle = require('../')
const AARectangleFromSrc = require('../src/AARectangle').AARectangle

describe('index', function () {
  it('exports AARectangle from src', function () {
    expect(AARectangle).to.eq(AARectangleFromSrc)
  })
})
