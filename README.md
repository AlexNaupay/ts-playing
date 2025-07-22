```bash
npx ts-node src/index.ts
```

### JWT with private and public keys
```bash
# Private key
openssl genpkey -algorithm RSA -out private.key -pkeyopt rsa_keygen_bits:2048
# Extract public key
openssl rsa -pubout -in private.key -out public.key


```