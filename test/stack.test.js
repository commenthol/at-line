const assert = require('assert')
const {stack} = require('..')

describe('#stack', function () {
  it('should extract traces with *Nix path', function () {
    const err = {}
    err.stack = 'Error\n    at Object.<anonymous> (/home/user/test/test.js:1:90)\n    at a strange line\n    at Module._compile (module.js:635:30)\n    '
    const res = stack(err)
    // console.log(res)
    assert.deepEqual(res, [ {
      func: 'Object.<anonymous>',
      file: '/home/user/test/test.js',
      line: '1',
      col: '90'
    }, {
      func: 'Module._compile',
      file: 'module.js',
      line: '635',
      col: '30'
    } ])
  })

  it('should extract traces with M$ path', function () {
    const err = {}
    err.stack = 'Error\n    at Object.<anonymous> (C:\\Users\\IEUser\\test\\test.js:4:13)\n    at Module._compile (module.js:635:30)\n    '
    const res = stack(err)
    // console.log(res)
    assert.deepEqual(res, [ {
      func: 'Object.<anonymous>',
      file: 'C:\\Users\\IEUser\\test\\test.js',
      line: '4',
      col: '13'
    }, {
      func: 'Module._compile',
      file: 'module.js',
      line: '635',
      col: '30'
    } ])
  })

  it('should extract file without function', function () {
    const err = {
      stack: 'Error: Things keep happening!\n   at /home/gbusey/file.js:525:2\n   at Frobnicator.refrobulate (/home/gbusey/business-logic.js:424:21)\n   at Actor.<anonymous> (/home/gbusey/actors.js:400:8)\n   at increaseSynergy (/home/gbusey/actors.js:701:6)'
    }
    const res = stack(err)
    // console.log(res)
    assert.deepEqual(res, [ {
      func: undefined,
      file: '/home/gbusey/file.js',
      line: '525',
      col: '2'
    }, {
      func: 'Frobnicator.refrobulate',
      file: '/home/gbusey/business-logic.js',
      line: '424',
      col: '21'
    }, {
      func: 'Actor.<anonymous>',
      file: '/home/gbusey/actors.js',
      line: '400',
      col: '8'
    }, {
      func: 'increaseSynergy',
      file: '/home/gbusey/actors.js',
      line: '701',
      col: '6'
    } ])
  })
})
