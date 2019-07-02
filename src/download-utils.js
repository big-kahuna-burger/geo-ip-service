var hyperquest = require('hyperquest')
var path = require('path')
var concat = require('concat-stream')
var tarfs = require('tar-fs')
var zlib = require('zlib')

const debug = require('debug')('bkb:geoip')

const { defaultUrl, vendorDir } = require('./constants')

module.exports = { download, lastModified }

function lastModified () {
  return new Promise((resolve, reject) => {
    return hyperquest(defaultUrl, { method: 'HEAD' })
      .on('response', res => resolve(new Date(res.headers['last-modified'])))
      .on('error', reject)
  })
}

function download () {
  return new Promise((resolve, reject) => {
    hyperquest(defaultUrl)
      .on('response', onResponse)
      .on('error', reject)
    function onResponse (res) {
      return res
        .pipe(zlib.createGunzip())
        .pipe(tarfs.extract(vendorDir, { ignore, map, mapStream }))
        .on('error', reject)
    }

    function ignore (name) {
      return path.extname(name) !== '.mmdb'
    }

    function map (header) {
      // debug({ header })
      header.name = header.name.split('/')[1]
      return header
    }

    function mapStream (fileStream, header) {
      if (path.extname(header.name) === '.mmdb') {
        fileStream.pipe(concat(resolve))
      }
      return fileStream
    }
  })
}
