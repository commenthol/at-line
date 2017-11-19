const assert = require('assert')
const atLine = require('..')

describe('#atLine', function () {
  it('should return calling line', function () {
    const res = atLine()

    // console.log(res)
    assert.equal(res.func, 'Context.<anonymous>')
    assert(/at-line[/\\]test[/\\]atLine\.test\.js$/.test(res.file))
    assert.equal(res.line, '6')
    assert.equal(res.col, '17')
  })

  it('should return calling line of outer function', function () {
    const F2 = () => atLine(3)
    const F1 = () => F2()
    const F = () => F1()

    const res = F()
    // console.log(res)
    assert.equal(res.func, 'F')
    assert(/at-line[/\\]test[/\\]atLine\.test\.js$/.test(res.file))
    assert.equal(res.line, '18')
    assert.equal(res.col, '21')
  })
})
