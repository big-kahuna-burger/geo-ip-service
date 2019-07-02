const { Reader } = require('maxmind')

function createReader (buffer) {
  try {
    return new Reader(buffer)
  } catch (err) {
    throw err
  }
}

module.exports = createReader
