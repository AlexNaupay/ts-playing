import {Promise as BluePromise} from 'bluebird';
import axios from 'axios';

const awaitForMe = (seconds: number) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

// Array de 20 destinos (URLs y datos a enviar)
const destinations = [
    { url: 'https://example.com/api/v1/user/1', data: { id: 1 }, timeout: 15, order:1 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 1 }, timeout: 2, order:2 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 1 }, timeout: 3, order:3 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 1 }, timeout: 10, order:4 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 1 }, timeout: 2, order:5 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 1 }, timeout: 1, order:6 },
];

// Función para enviar una solicitud POST
const sendPostRequest = async (destination:any) => {
    console.log('-> Sending to _____:', destination.url, destination.order);
    await awaitForMe(destination.timeout);
    console.log('<- About to resolve:', destination.url, destination.order);
    try {
        const response = await axios.post(destination.url, destination.data);
        return { status: 'success', id: destination.data.id, response: response.data };
    } catch (error:any) {
        return { status: 'error', id: destination.data.id, error: error.message || 'error' };
    }
};

// Procesar las solicitudes con concurrencia de 4
/*BluePromise.map(destinations, sendPostRequest, { concurrency: 2 })
    .then(results => {
        console.log('Resultados:', results);
    })
    .catch(err => {
        console.error('Error en el proceso:', err);
    });*/
// console.info(destinations);
BluePromise.map(destinations, async (dst) => {
    const result =  await sendPostRequest(dst)
    console.log('-- Result for :', dst.order);
    return result;
}, { concurrency: 2 })
    .then(results => {
        console.log('Resultados:', results);
    })
    .catch(err => {
        console.error('Error en el proceso:', err);
    });

console.info(destinations.toSorted((a,b) => b.order-a.order));