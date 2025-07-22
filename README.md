```bash
npx ts-node src/index.ts
```

### JWT with private and public keys
```bash
# Symmetric: HS, Asymmetric:  RS, ES, PS, EdDSA
# Private key
openssl genpkey -algorithm RSA -out private.key -pkeyopt rsa_keygen_bits:2048
# Extract public key
openssl rsa -pubout -in private.key -out public.key

#ES256 ≈ RSA 3072 bits
#ES384 ≈ RSA 7680 bits
#ES512 ≈ RSA 15360 bits
# Generar la clave privada EC con curva P-521
openssl ecparam -name secp521r1 -genkey -noout -out ec512-private.key
# Extraer la clave pública de esa clave privada
openssl ec -in ec512-private.key -pubout -out ec512-public.key

# ES256
openssl ecparam -name prime256v1 -genkey -noout -out ec256-private.key
openssl ec -in ec256-private.key -pubout -out ec256-public.key

```

| Algoritmo JWT | Tipo       | Hash usado | Tamaño clave/curva  | Equivalente RSA bits | Seguridad estimada (bits efectivos) |
| ------------- | ---------- | ---------- | ------------------- | -------------------- | ----------------------------------- |
| **HS256**     | Simétrico  | SHA-256    | Clave secreta ≥256b | N/A                  | 128 bits                            |
| **HS384**     | Simétrico  | SHA-384    | Clave secreta ≥384b | N/A                  | 192 bits                            |
| **HS512**     | Simétrico  | SHA-512    | Clave secreta ≥512b | N/A                  | 256 bits                            |
| **RS256**     | Asimétrico | SHA-256    | 2048 bits           | 2048 bits            | 112 bits                            |
| **RS384**     | Asimétrico | SHA-384    | 3072 bits           | 3072 bits            | 128 bits                            |
| **RS512**     | Asimétrico | SHA-512    | 4096 bits           | 4096 bits            | 152 bits                            |
| **PS256**     | Asimétrico | SHA-256    | 2048 bits           | 2048 bits            | 112 bits                            |
| **PS384**     | Asimétrico | SHA-384    | 3072 bits           | 3072 bits            | 128 bits                            |
| **PS512**     | Asimétrico | SHA-512    | 4096 bits           | 4096 bits            | 152 bits                            |
| **ES256**     | Asimétrico | SHA-256    | Curve P-256         | \~3072 bits          | 128 bits                            |
| **ES384**     | Asimétrico | SHA-384    | Curve P-384         | \~7680 bits          | 192 bits                            |
| **ES512**     | Asimétrico | SHA-512    | Curve P-521         | \~15360 bits         | 256 bits                            |
| **ES256K**    | Asimétrico | SHA-256    | Curve secp256k1     | \~3072 bits          | 128 bits                            |
| **EdDSA**     | Asimétrico | SHA-512    | Curve Ed25519       | \~3072 bits          | 128 bits                            |

| Necesidad                       | Recomendación     |
| ------------------------------- | ----------------- |
| Rendimiento y simplicidad       | `HS256`           |
| Seguridad asimétrica básica     | `RS256` o `PS256` |
| Seguridad moderna + rendimiento | `ES256` o `EdDSA` |
| Máxima seguridad (largo plazo)  | `ES512` o `PS512` |
