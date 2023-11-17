import querystring from 'querystring'
import { validate as isIp } from 'maxmind'
import fromReq from './from-req.js'

/**
 * @param {any} req http request to determine client ip from
 * @returns ipv4 or ipv6 address string 'i.e. "9.71.3.5"'
 * looks for ip key in querystring and falls back to ip from request if no qs was provided
 */

export default function ({ queryStringProperty = 'ip' }) {
  return req => detectIP(req, queryStringProperty)
}

function detectIP (req, queryStringProperty) {
  const ip = querystring.parse(req.url.split('?')[1])[queryStringProperty]
  return isIp(ip) ? ip : fromReq(req)
}
