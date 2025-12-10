import axios from 'axios';
import axiosRetry from "axios-retry";
import { DateTime, Settings } from "luxon";

// https://www.npmjs.com/package/axios-retry

Settings.defaultZone = 'America/Lima';

const initialTime = DateTime.now();

// Configure axios-retry with an Axios instance
axiosRetry(axios, {
    retries: 8, // Number of retry attempts
    //retryDelay: axiosRetry.linearDelay(2000), // Exponential backoff delay
    retryDelay: axiosRetry.exponentialDelay, // Exponential backoff delay
    shouldResetTimeout: true,
    retryCondition: (error) => {
        // console.log(!error.response)
        // Custom retry condition: retry on network errors or 5xx status codes
        return axiosRetry.isNetworkError(error) || axiosRetry.isRetryableError(error)
            //|| error?.response?.status >= 500;
    },
    onRetry: (retryCount, error, requestConfig) => {
        console.log(`[${DateTime.now()}] Retrying (attempt ${retryCount}):`, requestConfig.url);
    }
});

// https://publicapis.io/
console.log(`[${DateTime.now()}] Started at ${initialTime.toFormat('HH:mm:ss')}`);

// Make your Axios request
// https://api.example.com/data (Does not exist)
// https://pokeapi.co
axios.get('https://api.example.com/data')
    .then(response => {
        console.log('Success:', response.data);
    })
    .catch(error => {
        console.error('Failed after retries:', error.message);
    });