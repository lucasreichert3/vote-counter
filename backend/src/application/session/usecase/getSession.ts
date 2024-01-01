import Session from '../../../domain/entity/Session';
import { SessionRepository } from '../repository/SessionRepository';

export default class GetSession {
  constructor(private sessionRepository: SessionRepository) {}

  async execute(input: Input) {
    try {
      const { id } = input;

      const { open, createdAt, duration, openDate, pautaId, updatedAt, pauta } =
        await this.sessionRepository.findOne(id, ['pauta']);

      return new Session(
        id,
        pautaId,
        open,
        openDate,
        duration,
        updatedAt,
        createdAt,
        [],
        pauta
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

type Input = {
  id: string;
};
