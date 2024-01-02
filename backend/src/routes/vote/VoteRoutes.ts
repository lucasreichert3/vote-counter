import { Session } from '@prisma/client';
import express, { Request, Response, Router } from 'express';
import { VoteDatabase } from '../../application/vote/repository/VoteRepository';
import MongoConnection from '../../infra/database/MongoConnection';
import SessionDatabaseRepository from '../../infra/repository/session/SessionDatabaseRepository';
import VoteDatabaseRepository from '../../infra/repository/vote/VoteDatabaseRepository';
import { RoutesInterface } from '../RoutesInterface';
import CreateVote from '../../application/vote/usecase/createVote';
import GetVotes from '../../application/vote/usecase/getVotesBySession';

export default class VoteRoutes implements RoutesInterface {
  readonly repository: VoteDatabaseRepository;
  readonly sessionRepository: SessionDatabaseRepository;
  readonly router = express.Router();

  constructor(readonly connection: MongoConnection<unknown>) {
    this.repository = new VoteDatabaseRepository(
      connection as MongoConnection<VoteDatabase>
    );
    this.sessionRepository = new SessionDatabaseRepository(
      connection as MongoConnection<Session>
    );
  }

  routes(): Router {
    this.router.post('/', this.create);
    this.router.get('/', this.getAll);

    return this.router;
  }

  create = async (req: Request, res: Response) => {
    const { sessionId, vote, userId } = req.body;

    const createVote = new CreateVote(this.repository, this.sessionRepository);

    try {
      const result = await createVote.execute({ sessionId, vote, userId });

      res.json({ ...result });
    } catch (error: any) {
      res.json({ error: error.message });
    }
  };

  getAll = async (req: Request, res: Response) => {
    const { page = 0, items = 10, sessionId, vote } = req.query;

    const getVotes = new GetVotes(this.repository);

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
  };
}
