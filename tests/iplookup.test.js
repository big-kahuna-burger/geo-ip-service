const test = require('ava')
const fixture = require('./fixtures/city-of-8.8.8.8.json')
const iplookup = require('../src/iplookup')

test('should fetch city data given an IP', async t => {
  t.plan(1)
  const cityInfo = await iplookup('8.8.8.8')
  t.deepEqual(cityInfo, fixture, 'info matches recorded')
})
