import createHttpError from 'http-errors';
import Session from '../../../domain/entity/Session';
import { PautaRepository } from '../../pauta/repository/PautaRepository';
import { SessionRepository } from '../repository/SessionRepository';

export default class CreateSession {
  constructor(
    private sessionRepository: SessionRepository,
    private pautaRepository: PautaRepository
  ) {}

  async execute(input: Input): Promise<Session> {
    try {
      const { closeDate, pautaId } = input;

      const pauta = await this.pautaRepository.findOne(pautaId, ['session']);

      if (!pauta) {
        throw new createHttpError.NotFound('Pauta not found');
      }

      console.log(pauta.session);

      if (pauta.session) {
        throw new createHttpError.BadRequest('Pauta already has a session');
      }

      const { id } = await this.sessionRepository.create({
        closeDate,
        pauta: { connect: { id: pautaId } },
      });

      return new Session(id, pautaId, closeDate, new Date(), new Date());
    } catch (error: any) {
      console.error(error);

      throw new Error(error.message);
    }
  }
}

type Input = {
  pautaId: string;
  closeDate: Date;
};
