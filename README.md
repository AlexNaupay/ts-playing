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

# Generar la clave privada EC con curva P-521
openssl ecparam -name secp521r1 -genkey -noout -out ec512-private.key
# Extraer la clave pública de esa clave privada
openssl ec -in ec512-private.key -pubout -out ec512-public.key

```