### Rodando a aplicação

Para rodar o backend:

1.
```bash
docker run -d --rm --name mongo -p 27017:27017 prismagraphql/mongo-single-replica:4.4.3-bionic
```
2. 
```bash
cd backend
```

2. 
```bash
npm run dev
```

Para rodar o front:

1. 
```bash
cd frontend
```

2. 
```bash
npm start
```