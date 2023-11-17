import test from 'ava'
import nock from 'nock'
import { unlink, writeFile, readFile } from 'fs/promises'

import reader from '../src/reader.js'
import { maxMindHost, maxMindPath, fixtureTgzFile, dateFile } from '../src/constants.js'
import { download } from '../src/download-utils.js'
const delay = async (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms))

test('should get tar.gz file and unpack it to disk', async t => {
  try {
    const dateFileContent = await readFile(dateFile)
    await writeFile(dateFile + '.tmp', dateFileContent)
    await unlink(dateFile)
  } catch (_) {}
  /* pre update */ reader.get('1.1.1.1')
  const lastModifiedDate = '2099-10-11T20:32:59.000Z'
  const headers = { 'Last-Modified': lastModifiedDate }
  const scope = nock('https://' + maxMindHost)
    .head(maxMindPath)
    .reply(200, {}, headers)
    .get(maxMindPath)
    .replyWithFile(200, fixtureTgzFile, headers)

  await download()
  await delay(5000) // give some time for reader watcher to pickup fs event

  t.notThrows(() => reader.get('1.1.1.1'), 'post update reader should still work')
  
  try {
    const tempDateContent = await readFile(dateFile + '.tmp')
    await writeFile(dateFile, tempDateContent)
    await unlink(dateFile + '.tmp')
  } catch (_) {}
  scope.done()
})