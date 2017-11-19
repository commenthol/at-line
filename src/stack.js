'use strict'

const RE_STACK = /^\s+at ([^ ]*?) \((.*?):(\d+):(\d+)\).*?$|^\s+at (.*?):(\d+):(\d+).*?$/

module.exports = stack

/**
* get error stack with processable information
* @param {Error} err - error
* @param {String} err.stack - stacktrace
* @param {Number} [depth] - required depth of stacktrace
* @param {Number} [start] - start with line `start`
* @return {Array} array of processed stack trace lines `[{func, file, line, col}]`
*/
function stack (err, depth, start) {
  start = start ? start + 1 : 1
  depth = depth ? start + depth : void (0)

  if (!err || typeof err.stack !== 'string') return []

  return err.stack.split(/\n/).slice(start, depth)
    .map((line) => stackLine(line)).filter(line => line)
}

/**
* extract info from stack trace line
* @api private
* @param {String} line
* @return {Object} `{func, file, line, col}`
*/
function stackLine (line) {
  let o
  const m = RE_STACK.exec(line)
  if (m) {
    o = {
      func: m[1],
      file: m[2] || m[5],
      line: m[3] || m[6],
      col: m[4] || m[7]
    }
  }
  return o
}
