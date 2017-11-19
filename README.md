# at-line

> get calling function, filename, line-number from error stack trace

## Installation

Requires [nodejs](http://nodejs.org/).

```sh
$ npm install at-line
```

## Usage

```js
const {atLine} = require('at-line')

const f = () => {
  const at = atLine()
  console.log(at)
}

f()
// >
// { func: 'f',
//   file: '/home/user/at-line/examples/test.js',
//   line: '4',
//   col: '14' }
```

## API

### `atLine([n])`

Get calling function, filename, line-number and column from stack trace at the
point of calling `atLine`

NOTE: This is a slow function!

### Parameters

| parameter | type   | description                             |
| --------- | ------ | --------------------------------------- |
| `[n]`     | Number | _optional:_ get result from n-th line   |

**Returns** `Object`, `{func, file, line, col}`

### `atLine.stack(err, [depth], [start])`

Get error stack with processable information

### Parameters

| parameter   | type   | description                                |
| ----------- | ------ | ------------------------------------------ |
| `err`       | Error  | error  |
| `err.stack` | String | stacktrace |
| `[depth]`   | Number | _optional:_ required depth of stacktrace |
| `[start]`   | Number | _optional:_ start with line |

**Returns** `Array`, array of processed stack trace lines `[{func, file, line, col}]`

## Tests

```sh
$ npm test
```

## LICENSE

Unlicense <https://unlicense.org>
