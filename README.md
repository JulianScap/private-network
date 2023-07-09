# private-network

This is going nowhere

# Generate keys

```shell
mkdir .keys
cd .keys
openssl genrsa -out private-key.pem 2048
openssl rsa -in private-key.pem -out public-key.pem -pubout -outform PEM
```

# Environment

Create an `.env` file in `back-end` with the following:
```properties
domain=<the domain here>
```

Create an `.env` file in `front-end` with the following:
```properties
backendUrl=http://localhost:51055
```

# Deploy

```
cd docker
yarn deploy
```
