const _ = require('lodash')


const obj = {}

console.log(_.get(obj, 'key.key.key'))
console.log(typeof _.get(obj, 'key.key.key'))
console.log(typeof _.get(obj, 'key.key.key') !== 'undefined')

if (typeof _.get(obj, 'key.key.key') !== 'undefined') {
    console.log("bom")
} else {
    console.log("ruim")
}