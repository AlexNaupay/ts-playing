import { sign } from 'jsonwebtoken'
import fs from 'node:fs';

// Leer clave privada
const privateKey = fs.readFileSync('src/files/private.key');

// Crear payload
const payload = {
    userId: 123,
    role: 'admin'
};

// Firmar el token con RS256
const token = sign(payload, privateKey, { algorithm: 'RS256' });

console.log('Token JWT firmado:', token);


