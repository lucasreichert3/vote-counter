import express from 'express';
import PautaDatabaseRepository from './infra/repository/PautaDatabaseRepository';
import MongoConnection from './infra/database/MongoConnection';
import { Pauta } from './domain/entity/Pauta';

const app = express();

app.use(express.json());

app.post('/pauta', async (req, res) => {
  const body = req.body;

  const connection = new MongoConnection<Pauta>();
  const repository = new PautaDatabaseRepository(connection);

  const result = await repository.create(body);

  res.json({ ...result });
});

app.get('/pauta/:id', async (req, res) => {
  const { id } = req.params;

  const connection = new MongoConnection<Pauta>();
  const repository = new PautaDatabaseRepository(connection);

  const result = await repository.findOne(id);

  res.json({ ...result });
});

app.get('/pauta', async (req, res) => {
  const connection = new MongoConnection<Pauta>();
  const repository = new PautaDatabaseRepository(connection);

  const result = await repository.findAll();

  res.json({ data: result, total: result.length });
});

app.delete('/pauta/:id', async (req, res) => {
  const { id } = req.params;

  const connection = new MongoConnection<Pauta>();
  const repository = new PautaDatabaseRepository(connection);

  await repository.delete(id);

  res.status(201);
});

app.listen(3000);
