const test = require('ava')
const nock = require('nock')

const { maxMindHost, maxMindPath, fixtureTgzFile } = require('../src/constants')

const { lastModified, download } = require('../src/download-utils')
const createReader = require('../src/reader-factory')
const lastModifiedDate = '2019-07-01T20:32:59.000Z'

test('should fetch last modified date using head request', async t => {
  t.plan(1)
  const scope = nock(maxMindHost)
    .head(maxMindPath)
    .reply(200, {}, { 'Last-Modified': lastModifiedDate })

  await lastModified().then(serverMtime => {
    t.snapshot(serverMtime, 'server mtime matches snapshot')
    scope.done()
  }, t.fail)
})

test('should fetch fresh db from server', async t => {
  t.plan(1)

  const scope = nock(maxMindHost) // nock it with a prepared fixture so we don't hit server from CI
    .get(maxMindPath)
    .replyWithFile(200, fixtureTgzFile)

  await download().then(buffer => {
    t.notThrows(() => createReader(buffer), 'shall not throw with valid buffer')
    scope.done()
  }, t.fail)
})
