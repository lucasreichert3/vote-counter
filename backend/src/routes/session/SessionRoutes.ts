import express, { Request, Response, Router } from 'express';
import { RoutesInterface } from '../RoutesInterface';
import MongoConnection from '../../infra/database/MongoConnection';
import { Pauta, Session } from '@prisma/client';
import SessionDatabaseRepository from '../../infra/repository/session/SessionDatabaseRepository';
import CreateSession from '../../application/session/usecase/createSession';
import PautaDatabaseRepository from '../../infra/repository/pauta/PautaDatabaseRepository';
import { PautaDatabase } from '../../application/pauta/repository/PautaRepository';
import GetSession from '../../application/session/usecase/getSession';
import GetSessions from '../../application/session/usecase/getSessions';

export default class SessionRoutes implements RoutesInterface {
  readonly repository: SessionDatabaseRepository;
  readonly pautaRepository: PautaDatabaseRepository;
  readonly router = express.Router();

  constructor(readonly connection: MongoConnection<unknown>) {
    this.repository = new SessionDatabaseRepository(
      connection as MongoConnection<Session>
    );
    this.pautaRepository = new PautaDatabaseRepository(
      connection as MongoConnection<PautaDatabase>
    );
  }

  routes(): Router {
    this.router.post('/', this.create);
    this.router.get('/:id', this.getById);
    this.router.get('/', this.getAll);

    return this.router;
  }

  create = async (req: Request, res: Response) => {
    const { closeDate, pautaId } = req.body;

    const createSession = new CreateSession(
      this.repository,
      this.pautaRepository
    );

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
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const getSession = new GetSession(this.repository);

    try {
      const result = await getSession.execute({ id });

      res.json({ ...result });
    } catch (error: any) {
      res.json({ error: error.message });
    }
  };

  getAll = async (req: Request, res: Response) => {
    const { page = 0, items = 10 } = req.query;

    const getSessions = new GetSessions(this.repository);

    const result = await getSessions.execute({
      page: Number(page),
      items: Number(items),
    });

    res.json({ ...result });
  };
}
