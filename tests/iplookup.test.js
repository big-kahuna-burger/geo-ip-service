import test from 'ava'
import { createRequire } from 'module'

import iplookup from '../src/iplookup.js'
const require = createRequire(import.meta.url)
const fixture = require('./fixtures/city-of-8.8.8.8.json')

test('should fetch city data given an IP', async t => {
  const cityInfo = await iplookup('8.8.8.8')
  t.deepEqual(cityInfo, fixture, 'info matches recorded')
})
