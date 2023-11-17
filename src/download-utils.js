import { writeFile, readFile, unlink } from 'fs/promises'
import https from 'https'
import path from 'path'
import concat from 'concat-stream'
import tarfs from 'tar-fs'
import zlib from 'zlib'

import {
  maxMindHost,
  maxMindPath,
  vendorDir,
  dateFile,
  finalDest,
  dbPath
} from './constants.js'

export { download, lastModifiedAtOrigin }

async function lastModifiedAtOrigin () {
  const lm = await (new Promise((resolve, reject) => {
    const req = https.request({
      host: maxMindHost,
      path: maxMindPath,
      method: 'HEAD'
    }, res => resolve(res.headers['last-modified']))

    req.on('error', err => reject(err))
    req.end()
  }))
  return new Date(lm)
}

async function getLocalLastModifiedInSeconds () {
  try {
    const localModified = await readFile(dateFile)
    return parseInt(localModified)
  } catch (error) {
    return null
  }
}

async function download () {
  let lastModified
  const localValue = await getLocalLastModifiedInSeconds()
  const lmOrigin = await lastModifiedAtOrigin()
  const originValueSeconds = lmOrigin.getTime()

  if (localValue && localValue >= originValueSeconds) {
    // local date value exists and it's equal with what we see at origin, no need to update here
    // gt case is only used to ease testing this part 
    // this should never be the case otherwise and we could test for equality and early return
    return { lastModified: lmOrigin }
  }
  const buffer = await (new Promise((resolve, reject) => {
    const onResponse = res => {
      lastModified = res.headers['last-modified']
      res
        .pipe(zlib.createGunzip())
        .pipe(tarfs.extract(
          vendorDir, {
            ignore: name => path.extname(name) !== '.mmdb',
            map: header => {
              header.name = header.name.split('/')[1]
              return header
            },
            mapStream: (fileStream, header) => {
              if (path.extname(header.name) === '.mmdb') {
                fileStream.pipe(concat(resolve))
              }
              return fileStream
            }
          }))
    }
    const req = https.request({ host: maxMindHost, path: maxMindPath }, onResponse)
    req.on('error', reject)
    req.end()
  }))
  // all this is because we want to use maxmind.open with a watcher 
  // so it updates reader accoringly when new db arrives
  // problem with unpacking directly, is that zlib->tar streaming into destination is slow, 
  // and reader will see a corrupted file, so using fs instead to copy into destination is much much faster 
  // and allows reader watch events to find non-corrupted file on it's cycle

  await writeFile(dateFile, `${new Date(lastModified).getTime()}`) // save new date modified header file
  await writeFile(finalDest, buffer) // overwrite file at final dest where reader is watching
  try {
    await unlink(dbPath) // delete maxmind named file
  } catch (_) {} // just cleanup but ignore errors if file is not there
  return { buffer, lastModified }
}
