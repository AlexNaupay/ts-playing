import { verify } from 'jsonwebtoken'
import fs from 'node:fs';

// Leer clave pública
const publicKey = fs.readFileSync('src/files//public.key');

// Suponiendo que ya tienes un token JWT
const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywicm9sZSI6ImFkbWluIiwiaWF0IjoxNzUzMTUwMjU1fQ.ZgSM4xTYCSud-Nc9atpEbmgxV64akkdeAMYnLCWoOtH8BbUfdoeYHTwN7NbJOwtJPZJZxPwG2HWiLJ9Xi3NN3ufVjWuLoTBcTESI_yMLByG4vAEkIxBImDgYaYH2msFzPWBkiw1khpM8_-0zMMtY6j7qpEFu72T6SsLLSDqajhwnGnjNLIYfOu4WtXLm4rgFpayr2VMVw8g2A4OmHNeDT7kJopz57VGGBnWog7WvhFPo28G1cMbAo5L9IVYj-jpJZSB-xKYKmxFIzxTXVy0nd8wVkYCOGQc0fQ63fSsEzVBrcnC3Y-WlT1gpxrH4mlwMDuBBBx7UtabmHtAdD0ZMEA';

try {
    const decoded = verify(token, publicKey, { algorithms: ['RS256'] });
    console.log('Payload válido:', decoded);
} catch (err) {
    console.error('Token inválido:', err);
}



