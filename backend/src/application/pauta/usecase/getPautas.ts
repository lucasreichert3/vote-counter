import { Prisma } from '@prisma/client';
import Pauta from '../../../domain/entity/Pauta';
import { PautaRepository } from '../repository/PautaRepository';

export default class GetPautas {
  constructor(private pautaRepository: PautaRepository) {}

  async execute(input: Input): Promise<{ data: Pauta[]; total: number }> {
    const { category, page, items, sessionStatus } = input;

    const skip = page * items;

    const filter: Prisma.PautaWhereInput = { category };

    if (sessionStatus !== SessionStatus.ALL) {
      const filterType = sessionStatus === SessionStatus.OPEN ? 'gt' : 'lt';

      filter.session = { closeDate: { [filterType]: new Date() } };
    }

    try {
      const result = await this.pautaRepository.findAll(filter, items, skip);

      const { data, total } = result;

      const list = data.map(
        ({ id, title, description, category, createdAt, updatedAt, session }) =>
          new Pauta(
            id,
            title,
            category,
            createdAt,
            updatedAt,
            description || '',
            session || undefined
          )
      );

      return { data: list, total };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

type Input = {
  category?: string;
  page: number;
  items: number;
  sessionStatus: SessionStatus;
};

export enum SessionStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  ALL = 'all',
}
