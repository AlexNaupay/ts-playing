// https://moment.github.io/luxon/#/formatting?id=table-of-tokens

import { DateTime, Settings } from 'luxon'

Settings.defaultLocale = 'es-PE';

const LIMA_ZONE = 'America/Lima'

// process.env.TZ = 'America/Lima'
process.env.TZ = 'Europe/Madrid'

console.log(DateTime.now())
console.log(DateTime.now().toISO())
console.log(DateTime.now().toLocaleString(DateTime.DATETIME_FULL))
console.log(DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss'))
console.log(DateTime.now().toFormat('dd MMMM, yyyy'))

console.log(new Date())
console.log(new Date().toString())  // toString apply TZ or system tz

console.log('------------------------------')
const datetime_str = '2025-06-09T18:07:17.135-05:00'

const datetime = DateTime.fromISO(datetime_str)

console.log(datetime_str)
console.log(datetime)
console.log(datetime.setZone(LIMA_ZONE))  // Returns a newly constructed DateTime.
console.log(datetime)

console.log('------------------------------')
const datetimeWithNoTzStr = '2025-06-09T18:07:17.135'

const datetimeWithNoTz = DateTime.fromISO(datetimeWithNoTzStr)  // Asumes date in local zone TZ
// const datetimeWithNoTz = DateTime.fromISO(datetimeWithNoTzStr, { zone: 'utc' })  // You says datetime is in zone

console.log(datetimeWithNoTzStr)
console.log(datetimeWithNoTz)
console.log(datetimeWithNoTz.setZone(LIMA_ZONE))

console.log('------------------------------')
console.log(new Date())
console.log(DateTime.fromJSDate(new Date()))
