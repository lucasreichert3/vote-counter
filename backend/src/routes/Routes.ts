import express from 'express';
import PautaRoutes from './pauta/PautaRoutes';
import MongoConnection from '../infra/database/MongoConnection';
import SessionRoutes from './session/SessionRoutes';
import VoteRoutes from './vote/VoteRoutes';
import { RoutesInterface } from './RoutesInterface';

export default class Routes implements RoutesInterface {
  readonly router = express.Router();
  readonly connection = new MongoConnection<any>();

  constructor() {
    this.routes();
  }

  routes() {
    const pautaRoutes = new PautaRoutes(this.connection);
    const sessionRoutes = new SessionRoutes(this.connection);
    const voteRoutes = new VoteRoutes(this.connection);

    this.router.use('/pauta', pautaRoutes.routes());
    this.router.use('/session', sessionRoutes.routes());
    this.router.use('/vote', voteRoutes.routes());

    return this.router;
  }
}
