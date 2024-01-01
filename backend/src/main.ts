import { Pauta, Session } from '@prisma/client';
import express from 'express';
import CreatePauta from './application/pauta/usecase/createPauta';
import GetPautaById from './application/pauta/usecase/getPautaById';
import GetPautas from './application/pauta/usecase/getPautas';
import MongoConnection from './infra/database/MongoConnection';
import PautaDatabaseRepository from './infra/repository/pauta/PautaDatabaseRepository';
import SessionDatabaseRepository from './infra/repository/session/SessionDatabaseRepository';
import CreateSession from './application/session/usecase/createSession';
import GetSession from './application/session/usecase/getSession';
import GetSessions from './application/session/usecase/getSessions';

const app = express();

app.use(express.json());

app.post('/pauta', async (req, res) => {
  const { title, description, category } = req.body;

  const connection = new MongoConnection<Pauta>();
  const repository = new PautaDatabaseRepository(connection);

  const createPauta = new CreatePauta(repository);

  const result = await createPauta.execute({ title, description, category });

  res.json({ ...result });
});

app.get('/pauta/:id', async (req, res) => {
  const { id } = req.params;

  const connection = new MongoConnection<Pauta>();
  const repository = new PautaDatabaseRepository(connection);

  const getPauta = new GetPautaById(repository);

  const result = await getPauta.execute({ id });

  res.json({ ...result });
});

app.get('/pauta', async (req, res) => {
  const { category, page, items } = req.query;

  const connection = new MongoConnection<Pauta>();
  const repository = new PautaDatabaseRepository(connection);

  const getPauta = new GetPautas(repository);

  try {
    const { data, total } = await getPauta.execute({
      category: category as string,
      page: page ? Number(page) : undefined,
      items: items ? Number(items) : undefined,
    });

    res.json({ data, total });
  } catch (error: any) {
    console.log(JSON.stringify(error.message));
  }
});

app.post('/session', async (req, res) => {
  const { duration, openDate, pautaId } = req.body;

  const connection = new MongoConnection<Session>();
  const connectionPauta = new MongoConnection<Pauta>();
  const repository = new SessionDatabaseRepository(connection);

  const pautaRepository = new PautaDatabaseRepository(connectionPauta);

  const createSession = new CreateSession(repository, pautaRepository);

  const openDateFormated = new Date(openDate);

  const result = await createSession.execute({
    duration,
    openDate: openDateFormated,
    pautaId,
  });

  res.json({ ...result });
});

app.get('/session/:id', async (req, res) => {
  const { id } = req.params;

  const connection = new MongoConnection<Session>();
  const repository = new SessionDatabaseRepository(connection);

  const getSession = new GetSession(repository);

  const result = await getSession.execute({ id });

  res.json({ ...result });
});

app.get('/session', async (req, res) => {
  const { page = 0, items = 10 } = req.query;

  const connection = new MongoConnection<Session>();
  const repository = new SessionDatabaseRepository(connection);

  const getSessions = new GetSessions(repository);

  const result = await getSessions.execute({
    page: Number(page),
    items: Number(items),
  });

  res.json({ ...result });
});

app.listen(3000);
