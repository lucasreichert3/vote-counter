import Vote from '../../../domain/entity/Vote';
import { VoteRepository } from '../repository/VoteRepository';

export default class GetVotes {
  constructor(private voteRepository: VoteRepository) {}

  async execute(input: Input) {
    try {
      const { page, items, vote, sessionId } = input;

      const skip = page * items;

      const filter = { vote, sessionId };

      if (vote === undefined) {
        delete filter.vote;
      }

      const { data, total } = await this.voteRepository.findAll(
        filter,
        skip,
        items,
        ['session']
      );

      const list = data?.map(
        ({ id, vote, userId, sessionId, updatedAt, createdAt, session }) =>
          new Vote(
            id,
            session.pautaId,
            vote,
            userId,
            sessionId,
            updatedAt,
            createdAt
          )
      );

      return { data: list, total };
    } catch (error: any) {
      console.log(error);

      throw new Error(error.message);
    }
  }
}

type Input = {
  page: number;
  items: number;
  sessionId: string;
  vote?: boolean;
};
