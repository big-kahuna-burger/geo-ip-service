const url = require('url')
const querystring = require('querystring')
const isIp = require('./is-ip')
const fromReq = require('./from-req')

/**
 * @param {any} req http request to determine client ip from
 * @returns ipv4 or ipv6 address string 'i.e. "9.71.3.5"'
 * looks for ip key in querystring and falls back to ip from request if no qs was provided
 */

module.exports = function ({ queryStringProperty = 'ip' }) {
  return req => detectIP(req, queryStringProperty)
}

function detectIP (req, queryStringProperty) {
  const { query } = url.parse(req.url)
  const ip = querystring.parse(query)[queryStringProperty]
  return isIp(ip) ? ip : fromReq(req)
}
