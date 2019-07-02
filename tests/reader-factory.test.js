const test = require('ava')
const createReader = require('../src/reader-factory')

test('should throw when invalid mmdb buffer', t => {
  t.throws(
    () => createReader('jibrish'),
    /Unknown type undefined at offset 1/,
    'message'
  )
})
