### Mongo

use o seguinte comando para rodar o MongoDB no Docker:

```bash
# Create Docker network
docker network create app-network

# Run MongoDB, attach network and expose port
docker run -d --rm --name mongo --network app-network -p 27017:27017 prismagraphql/mongo-single-replica:4.4.3-bionic
```

Para conectar de outro contêiner quando utilizando Docker Compose será necessário especificar o query param `directConnection=true` na string de conexão.