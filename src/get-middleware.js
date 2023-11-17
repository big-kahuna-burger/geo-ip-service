import fromQs from './from-qs.js'
import iplookup from './iplookup.js'

function getMiddleware ({
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

export default getMiddleware
