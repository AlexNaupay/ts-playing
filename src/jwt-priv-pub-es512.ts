import { sign } from 'jsonwebtoken'
import fs from 'node:fs';

// Leer clave privada
const privateKey = fs.readFileSync('src/files/ec512-private.key');

// Crear payload
const payload = {
    userId: 123,
    role: 'admin'
};

// Firmar el token con ES512
const token = sign(payload, privateKey, { algorithm: 'ES512' });

console.log('Token JWT firmado:', token);


