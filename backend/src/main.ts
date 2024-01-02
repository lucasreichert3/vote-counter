import { Pauta, Session } from '@prisma/client';
import express from 'express';
import CreatePauta from './application/pauta/usecase/createPauta';
import GetPautaById from './application/pauta/usecase/getPautaById';
import GetPautas, {
  SessionStatus,
} from './application/pauta/usecase/getPautas';
import CreateSession from './application/session/usecase/createSession';
import GetSession from './application/session/usecase/getSession';
import GetSessions from './application/session/usecase/getSessions';
import { VoteDatabase } from './application/vote/repository/VoteRepository';
import CreateVote from './application/vote/usecase/createVote';
import MongoConnection from './infra/database/MongoConnection';
import PautaDatabaseRepository from './infra/repository/pauta/PautaDatabaseRepository';
import SessionDatabaseRepository from './infra/repository/session/SessionDatabaseRepository';
import VoteDatabaseRepository from './infra/repository/vote/VoteDatabaseRepository';
import GetVotes from './application/vote/usecase/getVotesBySession';
import GetPautaWithOpenSessions from './application/pauta/usecase/getPautasWithOpenSession';

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

  try {
    const getPauta = new GetPautaById(repository);

    const result = await getPauta.execute({ id });

    res.json({ ...result });
  } catch (error: any) {
    res.json({ error: error.message });
  }
});

app.get('/pauta', async (req, res) => {
  const {
    category,
    page = 0,
    items = 10,
    sessionStatus = SessionStatus.ALL,
  } = req.query;

  const connection = new MongoConnection<Pauta>();
  const repository = new PautaDatabaseRepository(connection);

  const getPautas = new GetPautas(repository);

  const { data, total } = await getPautas.execute({
    sessionStatus: sessionStatus as SessionStatus,
    category: category as string,
    page: Number(page),
    items: Number(items),
  });

  res.json({ data, total });
});

app.post('/session', async (req, res) => {
  const { closeDate, pautaId } = req.body;

  const connection = new MongoConnection<Session>();
  const connectionPauta = new MongoConnection<Pauta>();
  const repository = new SessionDatabaseRepository(connection);

  const pautaRepository = new PautaDatabaseRepository(connectionPauta);

  const createSession = new CreateSession(repository, pautaRepository);

  const closeDateFormated = new Date(closeDate);

  try {
    const result = await createSession.execute({
      closeDate: closeDateFormated,
      pautaId,
    });

    res.json({ ...result });
  } catch (error: any) {
    res.json({ error: error.message });
  }
});

app.get('/session/:id', async (req, res) => {
  const { id } = req.params;

  const connection = new MongoConnection<Session>();
  const repository = new SessionDatabaseRepository(connection);

  const getSession = new GetSession(repository);

  try {
    const result = await getSession.execute({ id });

    res.json({ ...result });
  } catch (error: any) {
    res.json({ error: error.message });
  }
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

app.post('/vote', async (req, res) => {
  const { sessionId, vote, userId } = req.body;

  const connection = new MongoConnection<VoteDatabase>();
  const repository = new VoteDatabaseRepository(connection);

  const connectionSession = new MongoConnection<Session>();
  const sessionRepository = new SessionDatabaseRepository(connectionSession);

  const createVote = new CreateVote(repository, sessionRepository);

  try {
    const result = await createVote.execute({ sessionId, vote, userId });

    res.json({ ...result });
  } catch (error: any) {
    res.json({ error: error.message });
  }
});

app.get('/vote', async (req, res) => {
  const { page = 0, items = 10, sessionId, vote } = req.query;

  const connection = new MongoConnection<VoteDatabase>();
  const repository = new VoteDatabaseRepository(connection);

  const getVotes = new GetVotes(repository);

  try {
    const result = await getVotes.execute({
      sessionId: String(sessionId),
      page: Number(page),
      items: Number(items),
      vote: vote === 'true' ? true : vote === 'false' ? false : undefined,
    });

    res.json({ ...result });
  } catch (error: any) {
    res.json({ error: error.message });
  }
});

app.listen(3000);
