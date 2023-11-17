import { validate as isIp } from 'maxmind'

/**
 * @param {any} req http request to determine client ip from
 * @returns ipv4 or ipv6 address string 'i.e. "9.71.3.5"'
 * looks for ip given the http request
 */
export default function fromReq (req) {
  const ip =
    (req.headers && req.headers['x-forwarded-for']) ||
    req.ip ||
    req._remoteAddress ||
    (req.connection && req.connection.remoteAddress)
  return isIp(ip) ? ip : '::1'
}
