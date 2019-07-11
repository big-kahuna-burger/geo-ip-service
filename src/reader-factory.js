const { Reader } = require('maxmind')

function createReader (buffer) {
  return new Reader(buffer)
}

module.exports = createReader
