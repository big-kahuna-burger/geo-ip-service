const AsyncCache = require('async-cache')
const { dbPath } = require('./constants')
const mmdbBuffer = require('fs').readFileSync(dbPath)

const reader = require('./reader-factory')(mmdbBuffer)

const cityCache = new AsyncCache({
  load: (ip, cb) => {
    try {
      cb(null, reader.get(ip))
    } catch (err) {
      cb(err)
    }
  }
})

async function getIp (ip) {
  return new Promise(resolve => {
    cityCache.get(ip, (err, city) => {
      resolve(err ? null : city)
    })
  })
}

module.exports = getIp
