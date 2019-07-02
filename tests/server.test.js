const test = require('ava')
const supertest = require('supertest')
const app = require('../src/server')
const cityFixture = require('./fixtures/city-of-8.8.8.8.json')

test('should return city info in json format', async t => {
  t.plan(1)
  const listener = app.listen(0)

  await supertest
    .agent('http://localhost:' + listener.address().port)
    .get('/?ip=8.8.8.8')
    .then(response => {
      t.deepEqual(response.body, cityFixture, 'response matches expected')
      listener.close()
    })
    .catch(err => t.fail(err.message))
})
