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
DOMAIN=<the domain here>
```

Create an `.env` file in `front-end` with the following:

```properties
VITE_BACKEND=http://localhost:51055
```

# Deploy

```shell
cd docker
yarn deploy
```

# Database

<!-- Source: https://www.baeldung.com/openssl-self-signed-cert -->

```shell
mkdir .keys
cd .keys
openssl genrsa -out domain.key 2048 # -des3 add this if we want it the key encrypted
openssl req -key domain.key -new -out domain.csr
openssl x509 -signkey domain.key -in domain.csr -req -days 365 -out domain.crt
openssl pkcs12 -inkey domain.key -in domain.crt -export -out domain.pfx
```

# Add friend

## Alice creates the link
```mermaid
sequenceDiagram
    box Purple Alice's Services
        participant AF as Front End
        participant AB as Back End
    end
    box Green Bob's Services
        participant BF as Front End
        participant BB as Back End
    end

    AF->>+AB:Create a friend request
    AB->>AB:Create db record<br/>Generate a token for Bob
    AB->>+BB:Send token to Bob
    BB->>BB:Create db record
    BB->>-AB: OK
    AB->>-AF:OK
```

## Bob accepts the invite link

```mermaid
sequenceDiagram
    box Purple Alice's Services
        participant AF as Front End
        participant AB as Back End
    end
    box Green Bob's Services
        participant BF as Front End
        participant BB as Back End
    end

    BF->>+BB:Accept the friend request
    BB->>BB:Generate a token<br/>Update database
    BB->>+AB:Share the token with Alice
    AB->>AB:Update DB<br/>Save token
    AB->>-BB:OK
    BB->>-BF:OK
```

https://sequencediagram.org/

```
==Alice browses her posts==

Alice FE->Alice BE:GET /posts
activate Alice BE
Alice BE->Alice BE:Get own posts
Alice BE->Bob BE:Get Bob's posts
activate Bob BE
Alice BE<--Bob BE:Bob's posts
deactivate Bob BE
Alice FE<--Alice BE:Merged posts list
deactivate Alice BE
```
