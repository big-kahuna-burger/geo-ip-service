/**
 *
 *
 * @param {*} opts
 * @returns
 */
const iplookup = require('./iplookup')
const fromQs = require('./from-qs')

function middlewareFactory ({
  detector = fromQs({ queryStringProperty: 'ip' }),
  reqProperty = 'cityInfo'
} = {}) {
  return async (req, _res, next) => {
    try {
      const ip = detector(req)
      const cityInfo = await iplookup(ip)
      req[reqProperty] = cityInfo
      next()
    } catch (err) {
      next(err)
    }
  }
}

module.exports = middlewareFactory
