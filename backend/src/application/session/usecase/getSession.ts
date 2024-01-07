import createHttpError from 'http-errors';
import Session from '../../../domain/entity/Session';
import { SessionRepository } from '../repository/SessionRepository';
import { VoteRepository } from '../../vote/repository/VoteRepository';

export default class GetSession {
  constructor(
    private sessionRepository: SessionRepository,
    private voteRepository: VoteRepository
  ) {}

  async execute(input: Input) {
    try {
      const { id } = input;

      const session = await this.sessionRepository.findOne(id, ['pauta']);

      if (!session) {
        throw new createHttpError.NotFound('Session not found');
      }

      const { total: inFavor } = await this.voteRepository.findAll({
        sessionId: id,
        vote: true,
      });
      const { total: against } = await this.voteRepository.findAll({
        sessionId: id,
        vote: false,
      });
      const total = inFavor + against;

      const { createdAt, closeDate, pautaId, updatedAt, pauta } = session;

      return new Session(
        id,
        pautaId,
        closeDate,
        updatedAt,
        createdAt,
        pauta,
        total || 0,
        inFavor,
        against
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

type Input = {
  id: string;
};
