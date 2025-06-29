// Claude code
import {Promise as BluePromise} from 'bluebird';
import axios from 'axios';

const awaitForMe = (seconds: number) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

// Array de destinos (URLs y datos a enviar)
const destinations = [
    { url: 'https://example.com/api/v1/user/1', data: { id: 1 }, timeout: 15, order: 1 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 1 }, timeout: 2, order: 2 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 1 }, timeout: 3, order: 3 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 1 }, timeout: 10, order: 4 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 1 }, timeout: 2, order: 5 },
    { url: 'https://example.com/api/v1/user/1', data: { id: 1 }, timeout: 1, order: 6 },
];

// Función para enviar una solicitud POST
const sendPostRequest = async (destination: any) => {
    console.log('-> Sending to:', destination.url, 'order:', destination.order, 'timeout:', destination.timeout + 's');

    // Simular el tiempo de respuesta del endpoint
    await awaitForMe(destination.timeout);

    console.log('<- About to resolve:', destination.url, 'order:', destination.order);

    try {
        const response = await axios.post(destination.url, destination.data, {
            timeout: (destination.timeout + 5) * 1000, // Timeout de axios un poco mayor
        });
        return {
            status: 'success',
            id: destination.data.id,
            order: destination.order,
            response: response.data
        };
    } catch (error: any) {
        return {
            status: 'error',
            id: destination.data.id,
            order: destination.order,
            error: error.message || 'error'
        };
    }
};

// Función para manejar concurrencia con orden estricto
async function sendWithOrderedConcurrency(destinations: any[], concurrency: number = 2) {
    // Ordenar los destinos por order
    const sortedDestinations = destinations.sort((a, b) => a.order - b.order);

    console.log('🚀 Iniciando envío de', sortedDestinations.length, 'requests con concurrencia', concurrency);
    console.log('📋 Orden de procesamiento:', sortedDestinations.map(d => `${d.order}(${d.timeout}s)`).join(', '));

    const results: any[] = [];
    const inProgress: Promise<any>[] = [];
    let currentIndex = 0;

    // Función para iniciar el siguiente request en orden
    const startNext = (): Promise<any> | null => {
        if (currentIndex >= sortedDestinations.length) {
            return null;
        }

        const destination = sortedDestinations[currentIndex++];
        return sendPostRequest(destination);
    };

    // Iniciar los primeros requests hasta el límite de concurrencia
    while (inProgress.length < concurrency && currentIndex < sortedDestinations.length) {
        const promise = startNext();
        if (promise) {
            inProgress.push(promise);
        }
    }

    // Procesar requests mientras haya trabajo pendiente
    while (inProgress.length > 0) {
        // Esperar a que termine cualquiera de los requests en progreso
        const completedResult = await BluePromise.race(inProgress);

        // Encontrar y remover el promise completado
        const completedIndex = await BluePromise.map(inProgress, async (promise, index) => {
            try {
                const result = await BluePromise.race([promise, BluePromise.resolve(completedResult)]);
                return result === completedResult ? index : -1;
            } catch {
                return -1;
            }
        }).then(indices => indices.find(i => i !== -1));

        if (completedIndex !== undefined && completedIndex !== -1) {
            inProgress.splice(completedIndex, 1);
        }

        // Agregar el resultado
        results.push(completedResult);
        console.log('✅ Result for order:', completedResult.order, '- Status:', completedResult.status);

        // Iniciar el siguiente request si hay más pendientes
        const nextPromise = startNext();
        if (nextPromise) {
            inProgress.push(nextPromise);
        }
    }

    return results;
}

// Ejecutar el proceso
sendWithOrderedConcurrency(destinations, 2)
    .then(results => {
        console.log('\n📊 === RESUMEN DE RESULTADOS ===');

        // Ordenar resultados por order para mostrar en orden
        const sortedResults = results.sort((a, b) => a.order - b.order);

        sortedResults.forEach(result => {
            const status = result.status === 'success' ? '✅ Éxito' : '❌ Error';
            console.log(`Order ${result.order}: ${status}`);
            if (result.status === 'error') {
                console.log(`   Error: ${result.error}`);
            }
        });

        const successful = results.filter(r => r.status === 'success').length;
        const failed = results.length - successful;

        console.log(`\n🎯 Total: ${results.length} requests`);
        console.log(`   Exitosos: ${successful}`);
        console.log(`   Fallidos: ${failed}`);

        return results;
    })
    .catch(err => {
        console.error('❌ Error en el proceso:', err);
    });

// Espera a que uno termine xxx