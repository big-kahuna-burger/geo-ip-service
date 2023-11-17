import test from 'ava'
import supertest from 'supertest'

import { createRequire } from 'module'

import createServer from '../src/utils/server.js'
const require = createRequire(import.meta.url)
const cityFixture = require('./fixtures/city-of-8.8.8.8.json')

test('should return city info in json format', async t => {
  t.plan(1)
  const listener = createServer().listen(0)

  const { body } = await supertest
    .agent('http://localhost:' + listener.address().port)
    .get('/?ip=8.8.8.8')

  t.deepEqual(body, cityFixture, 'response matches expected')
  listener.close()
})

test('should return city info in json format 2', async t => {
  t.plan(1)
  const listener = createServer().listen(0)

  const { body } = await supertest
    .agent('http://localhost:' + listener.address().port)
    .get('/')

  t.deepEqual(body, null, 'response matches expected')
  listener.close()
})
