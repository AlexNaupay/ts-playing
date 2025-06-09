const reg = /^\d+$/;

console.info( reg.test('15.25') );

const REPORT_NUMBER_REGEX =
    /^(?<prefix>[A-Z]{3}\/[A-Z]{6}-[A-Z]{3,4}\/[A-Z]{2})\s*-\s*(?<year>\d{4})-(?<sequence>\d{1,4})$/;

console.log('report:' ,REPORT_NUMBER_REGEX.test('IGP/CENVUL-AUQ/BV - 2025-0004') )
console.info('report bad:' ,REPORT_NUMBER_REGEX.test('IGP/CENVUL-AUQ/BV - 2025-00004') )

console.info('report exec:' ,REPORT_NUMBER_REGEX.exec('IGP/CENVUL-AUQ/BV - 2025-0004') )
console.info('report exec bad:' ,REPORT_NUMBER_REGEX.exec('IGP/CENVUL-AUQ/BV - 2025-00045') )