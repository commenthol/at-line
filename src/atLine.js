'use strict'

const stack = require('./stack')

module.exports = atLine

/**
* get calling function, filename, linenumber and column from stack trace
* NOTE: This is a slow function
* @param {Number} [n] - get result from `n`-th  line
* @return {Object} - `{func, file, line, col}`
*/
function atLine (n) {
  n = n || 1
  const err = new Error()
  return stack(err, 1, n)[0]
}
