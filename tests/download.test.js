import test from 'ava'
import nock from 'nock'
import { Reader } from 'maxmind'
import { unlink } from 'fs/promises'

import { maxMindHost, maxMindPath, fixtureTgzFile, dateFile } from '../src/constants.js'
import { download } from '../src/download-utils.js'

test('should get tar.gz file and unpack it to disk', async t => {
  try {
    await unlink(dateFile)
  } catch (_) {}
  const lastModifiedDate = '2088-10-11T20:32:59.000Z'
  const headers = { 'Last-Modified': lastModifiedDate }
  const scope = nock('https://' + maxMindHost)
    .head(maxMindPath)
    .reply(200, {}, headers)
    .get(maxMindPath)
    .replyWithFile(200, fixtureTgzFile, headers)

  const { buffer } = await download()

  t.notThrows(() => new Reader(buffer), 'shall not throw with valid buffer')
  scope.done()
})

test('should skip download', async t => {
  const lastModifiedDate = '1970-07-01T20:32:59.000Z'
  const scope = nock('https://' + maxMindHost)
    .head(maxMindPath)
    .reply(200, {}, { 'Last-Modified': lastModifiedDate })

  const { buffer } = await download()

  t.falsy(buffer, 'should not return buffer')
  scope.done()
})
