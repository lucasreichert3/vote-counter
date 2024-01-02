import express, { Request, Response } from 'express';
import MongoConnection from '../../infra/database/MongoConnection';
import { Pauta } from '@prisma/client';
import PautaDatabaseRepository from '../../infra/repository/pauta/PautaDatabaseRepository';
import CreatePauta from '../../application/pauta/usecase/createPauta';
import GetPautaById from '../../application/pauta/usecase/getPautaById';
import GetPautas, {
  SessionStatus,
} from '../../application/pauta/usecase/getPautas';
import { RoutesInterface } from '../RoutesInterface';

export default class PautaRoutes implements RoutesInterface {
  readonly repository: PautaDatabaseRepository;
  readonly router = express.Router();

  constructor(readonly connection: MongoConnection<Pauta>) {
    this.repository = new PautaDatabaseRepository(connection);
  }

  routes() {
    this.router.post('/', this.create);
    this.router.get('/:id', this.getById);
    this.router.get('/', this.getAll);

    return this.router;
  }

  create = async (req: Request, res: Response) => {
    const { title, description, category } = req.body;

    const createPauta = new CreatePauta(this.repository);

    const result = await createPauta.execute({ title, description, category });

    res.json({ ...result });
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const getPauta = new GetPautaById(this.repository);

      const result = await getPauta.execute({ id });

      res.json({ ...result });
    } catch (error: any) {
      res.json({ error: error.message });
    }
  };

  getAll = async (req: Request, res: Response) => {
    const {
      category,
      page = 0,
      items = 10,
      sessionStatus = SessionStatus.ALL,
    } = req.query;

    const getPautas = new GetPautas(this.repository);

    const { data, total } = await getPautas.execute({
      sessionStatus: sessionStatus as SessionStatus,
      category: category as string,
      page: Number(page),
      items: Number(items),
    });

    res.json({ data, total });
  };
}
