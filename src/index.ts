import {isNumber, isNumberString, isISO8601, isInt} from 'class-validator'

console.log(isNumber(15))
console.log(isNumberString(15))
console.log(isInt(15.2))

console.info( isISO8601('2025-05-12T12:15:45', {strict: true, strictSeparator: true}) )

