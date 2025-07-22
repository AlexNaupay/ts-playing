import { verify } from 'jsonwebtoken'
import fs from 'node:fs';
import {configDotenv} from "dotenv";

configDotenv()

// Leer clave pública
const publicKey = fs.readFileSync('src/files/ec512-public.key', 'utf-8');

// Suponiendo que ya tienes un token JWT
const token = process.env.JWT_ES512 || '';

try {
    const decoded = verify(token, publicKey, { algorithms: ['ES512'] });
    console.log('Payload válido:', decoded);
} catch (err) {
    console.error('Token inválido:', err);
}



