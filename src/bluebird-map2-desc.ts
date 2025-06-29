import {Promise as BluePromise} from 'bluebird';
import axios from 'axios';
import { DateTime } from 'luxon';

// Método 4: Con manejo seguro y sin modificar el original
function moveLastToFirstSafe<T>(array: T[], count: number = 2): T[] {
    if (array.length <= count) {
        return [...array].toSorted(); // Si hay pocos elementos, retorna copia
    }

    const result = [...array];
    const extracted = result.splice(-count, Infinity).toReversed();
    result.unshift(...extracted);
    return result;
}
const awaitForMe = (seconds: number) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

// Array de 20 destinos (URLs y datos a enviar)
let destinations = [
    { url: 'https://example.com/api/v1/user/1', data: { id: 1 }, timeout: 2, order:5 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 1 }, timeout: 1, order:6 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 1 }, timeout: 10, order:4 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 1 }, timeout: 3, order:3 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 1 }, timeout: 2, order:2 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 1 }, timeout: 15, order:1 },
];

// Función para enviar una solicitud POST
const sendPostRequest = async (destination:any, start: DateTime) => {
    console.log(start.diffNow('seconds').toObject().seconds,'-> Sending to _____:', destination.url, destination.order);
    await awaitForMe(destination.timeout);

    console.log(start.diffNow('seconds').toObject().seconds,'<- About to resolve:', destination.url, destination.order);
    try {
        const response = await axios.post(destination.url, destination.data);
        return { status: 'success', id: destination.data.id, response: response.data };
    } catch (error:any) {
        return { status: 'error', id: destination.data.id, error: error.message || 'error' };
    }
};

const start = DateTime.now();

destinations = moveLastToFirstSafe(destinations, 2);

BluePromise.map(destinations, async (dst) => {
    const result =  await sendPostRequest(dst, start)
    console.log(start.diffNow('seconds').toObject().seconds,'-- Result for :', dst.order);
    return result;
}, { concurrency: 2 })
    .then(results => {
        console.log('Resultados:', results);
    })
    .catch(err => {
        console.error('Error en el proceso:', err);
    });
