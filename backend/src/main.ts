import { Pauta, Session } from '@prisma/client';
import express from 'express';
import CreateSession from './application/session/usecase/createSession';
import GetSession from './application/session/usecase/getSession';
import GetSessions from './application/session/usecase/getSessions';
import { VoteDatabase } from './application/vote/repository/VoteRepository';
import CreateVote from './application/vote/usecase/createVote';
import GetVotes from './application/vote/usecase/getVotesBySession';
import MongoConnection from './infra/database/MongoConnection';
import PautaDatabaseRepository from './infra/repository/pauta/PautaDatabaseRepository';
import SessionDatabaseRepository from './infra/repository/session/SessionDatabaseRepository';
import VoteDatabaseRepository from './infra/repository/vote/VoteDatabaseRepository';
import PautaRoutes from './routes/pauta/PautaRoutes';
import Routes from './routes/Routes';

const app = express();

app.use(express.json());

const routes = new Routes();

app.use('/', routes.routes());

app.listen(3000);
