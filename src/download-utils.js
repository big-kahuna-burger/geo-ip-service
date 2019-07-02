const hyperquest = require('hyperquest')
const path = require('path')
const concat = require('concat-stream')
const tarfs = require('tar-fs')
const zlib = require('zlib')

const { defaultUrl, vendorDir } = require('./constants')

module.exports = { download, lastModified, zlibTransform, tarfsWritable }

function lastModified () {
  return new Promise((resolve, reject) => {
    return hyperquest(defaultUrl, { method: 'HEAD' })
      .on('response', res => resolve(new Date(res.headers['last-modified'])))
      .on('error', reject)
  })
}

function zlibTransform () {
  return zlib.createGunzip()
}

function tarfsWritable (resolve) {
  return tarfs.extract(vendorDir, {
    ignore: name => path.extname(name) !== '.mmdb',
    map: header => {
      // debug({ header })
      header.name = header.name.split('/')[1]
      return header
    },
    mapStream: (fileStream, header) => {
      if (path.extname(header.name) === '.mmdb') {
        fileStream.pipe(concat(resolve))
      }
      return fileStream
    }
  })
}

function download () {
  return new Promise((resolve, reject) => {
    hyperquest(defaultUrl)
      .on('response', res => {
        return res
          .pipe(zlibTransform())
          .pipe(tarfsWritable(resolve))
          .on('error', reject)
      })
      .on('error', reject)
  })
}
