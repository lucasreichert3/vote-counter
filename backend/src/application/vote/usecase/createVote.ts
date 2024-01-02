import createHttpError from 'http-errors';
import { VoteRepository } from '../repository/VoteRepository';
import { SessionRepository } from '../../session/repository/SessionRepository';
import Vote from '../../../domain/entity/Vote';
import SessionIsOpen from '../../session/usecase/sessionIsOpen';

export default class CreateVote {
  constructor(
    private voteRepository: VoteRepository,
    private sessionRepository: SessionRepository
  ) {}

  async execute(input: Input) {
    try {
      const { sessionId, vote, userId } = input;

      const session = await this.sessionRepository.findOne(sessionId);

      if (!session) throw new createHttpError.NotFound('Session not found');

      const voteAlreadyExists =
        await this.voteRepository.findVotesBySessionIdAndUserId(
          sessionId,
          userId
        );

      if (voteAlreadyExists?.data?.length > 0)
        throw new createHttpError.Conflict(
          'Already exists a vote for this session and user'
        );

      const sessionIsOpen = await new SessionIsOpen(
        this.sessionRepository
      ).execute({
        id: sessionId,
      });

      if (!sessionIsOpen)
        throw new createHttpError.Forbidden('Session is closed');

      const { id, createdAt, updatedAt } = await this.voteRepository.create({
        userId,
        vote,
        session: { connect: session },
      });

      return new Vote(
        id,
        session.pautaId,
        vote,
        userId,
        sessionId,
        updatedAt,
        createdAt
      );
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}

type Input = {
  sessionId: string;
  vote: boolean;
  userId: string;
};
