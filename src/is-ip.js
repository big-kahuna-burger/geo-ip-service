const net = require('net')

module.exports = function isIP (ip) {
  const version = net.isIP(ip)
  return version === 4 || version === 6
}
