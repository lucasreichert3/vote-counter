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
      const { duration, openDate, pautaId } = input;

      const pauta = await this.pautaRepository.findOne(pautaId);

      if (!pauta) {
        throw new createHttpError.NotFound('Pauta not found');
      }

      const isOpen = openDate.getTime() < new Date().getTime();

      const { id } = await this.sessionRepository.create({
        duration,
        openDate,
        pauta: { connect: { id: pautaId } },
        open: isOpen,
      });

      return new Session(
        id,
        pautaId,
        isOpen,
        openDate,
        duration,
        new Date(),
        new Date()
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

type Input = {
  pautaId: string;
  duration: number;
  openDate: Date;
};
