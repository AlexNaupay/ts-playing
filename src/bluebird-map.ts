import {Promise as BluePromise} from 'bluebird';

const promiseArray = [
    BluePromise.resolve(1).delay(500*15),
    BluePromise.resolve(2).delay(500),
    BluePromise.resolve(3).delay(500*3),
    BluePromise.resolve(4).delay(500*8),
    BluePromise.resolve(5).delay(500*2),
    BluePromise.resolve(6).delay(500*10),
];

BluePromise.map(promiseArray, item => item * 2)
    .then(results => console.log('1:', results))
    .catch(err => console.error(err));

BluePromise.map(promiseArray, (item) => {

    console.log(new  Date(),item);
    return item;
}, {concurrency: 2})
    .then(results => console.log('2:', results))
    .catch(err => console.error(err));