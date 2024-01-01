import Session from '../../../domain/entity/Session';
import { SessionRepository } from '../repository/SessionRepository';

export default class GetSessions {
  constructor(private sessionRepository: SessionRepository) {}

  async execute(input: Input) {
    try {
      const { page = 0, items = 10 } = input;

      const skip = page * items;

      const { data, total } = await this.sessionRepository.findAll(
        skip,
        items,
        ['pauta']
      );

      const list = data.map(
        ({
          id,
          pauta,
          open,
          openDate,
          pautaId,
          duration,
          updatedAt,
          createdAt,
        }) =>
          new Session(
            id,
            pautaId,
            open,
            openDate,
            duration,
            updatedAt,
            createdAt,
            [],
            pauta
          )
      );

      return { data: list, total };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

type Input = {
  page?: number;
  items?: number;
};
