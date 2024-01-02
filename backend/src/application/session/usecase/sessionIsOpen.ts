import createHttpError from 'http-errors';
import { SessionRepository } from '../repository/SessionRepository';
import Session from '../../../domain/entity/Session';

export default class SessionIsOpen {
  constructor(private sessionRepository: SessionRepository) {}

  async execute(input: Input) {
    try {
      const { id } = input;

      const sessionExists = await this.sessionRepository.findOne(id, ['pauta']);

      if (!sessionExists) {
        throw new createHttpError.NotFound('Session not found');
      }

      const { createdAt, closeDate, pautaId, updatedAt, pauta } = sessionExists;

      const session = new Session(
        id,
        pautaId,
        closeDate,
        updatedAt,
        createdAt,
        [],
        pauta
      );

      return session.isOpen;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

type Input = {
  id: string;
};
