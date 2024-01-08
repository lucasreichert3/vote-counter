### Mongo

use o seguinte comando para rodar o MongoDB no Docker:

```bash
docker run -d --rm --name mongo -p 27017:27017 prismagraphql/mongo-single-replica:4.4.3-bionic
```

Para conectar de outro contêiner quando utilizando Docker Compose será necessário especificar o query param `directConnection=true` na string de conexão.