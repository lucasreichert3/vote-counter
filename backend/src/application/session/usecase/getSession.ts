import createHttpError from 'http-errors';
import Session from '../../../domain/entity/Session';
import { SessionRepository } from '../repository/SessionRepository';

export default class GetSession {
  constructor(private sessionRepository: SessionRepository) {}

  async execute(input: Input) {
    try {
      const { id } = input;

      const session = await this.sessionRepository.findOne(id, ['pauta']);

      if (!session) {
        throw new createHttpError.NotFound('Session not found');
      }

      const { createdAt, closeDate, pautaId, updatedAt, pauta } =
        session;

      return new Session(
        id,
        pautaId,
        closeDate,
        updatedAt,
        createdAt,
        pauta
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

type Input = {
  id: string;
};
