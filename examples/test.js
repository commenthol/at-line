const {atLine} = require('..')

const f = () => {
  const at = atLine()
  console.log(at) // eslint-disable-line no-console
}

f()
// >
// { func: 'f',
//   file: '/home/user/at-line/examples/test.js',
//   line: '4',
//   col: '14' }
