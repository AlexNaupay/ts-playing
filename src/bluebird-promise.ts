// Hack, sort desc, take final n and put first
import {Promise as BluePromise} from 'bluebird';

const awaitForMe = (seconds: number) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

const promiseArray = [
    { url: 'https://example.com/api/v1/user/1', data: { id: 'A' }, timeout: 15, order:1 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 'B' }, timeout: 2, order:2 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 'C' }, timeout: 3, order:3 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 'D' }, timeout: 10, order:4 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 'E' }, timeout: 2, order:5 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 'F' }, timeout: 1, order:6 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 'G' }, timeout: 1, order:7 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 'H' }, timeout: 8, order:8 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 'I' }, timeout: 1, order:9 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 'J' }, timeout: 7, order:10 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 'K' }, timeout: 1, order:11 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 'L' }, timeout: 5, order:12 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 'M' }, timeout: 1, order:13 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 'N' }, timeout: 1, order:14 },
];

const promiseArrayDesc = [
    { url: 'https://example.com/api/v1/user/1', data: { id: 'A' }, timeout: 15, order:14 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 'B' }, timeout: 2, order:13 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 'C' }, timeout: 3, order:12 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 'D' }, timeout: 10, order:11 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 'E' }, timeout: 2, order:10 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 'F' }, timeout: 1, order:9 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 'G' }, timeout: 1, order:8 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 'H' }, timeout: 8, order:7 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 'I' }, timeout: 1, order:6 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 'J' }, timeout: 7, order:5 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 'K' }, timeout: 1, order:4 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 'L' }, timeout: 5, order:3 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 'M' }, timeout: 1, order:2 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 'N' }, timeout: 1, order:1 },
];

/*BluePromise.map(promiseArray, async (item) => {
    console.log(new  Date(), JSON.stringify(item) );
    await awaitForMe(2)
    return item;
}, {concurrency: 2})
    .then(results => console.log( 'done ..'))
    .catch(err => console.error(err));*/



promiseArrayDesc.unshift(...promiseArrayDesc.splice(-4));
BluePromise.map(promiseArrayDesc, async (item) => {
    console.log(new  Date(), JSON.stringify(item) );
    await awaitForMe(4)
    return item;
}, {concurrency: 4})
    .then(results => console.log( 'done ..'))
    .catch(err => console.error(err));


