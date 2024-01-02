import { Prisma } from '@prisma/client';
import { PautaRepository } from '../repository/PautaRepository';

export default class GetPautaWithOpenSessions {
  constructor(private pautaRepository: PautaRepository) {}

  async execute(input: Input) {
    try {
      const { page, items, category } = input;

      const skip = page * items;

      const { data, total } =
        await this.pautaRepository.findAll(
          { category, session: { closeDate: { gt: new Date() } } },
          items,
          skip
        );

      return { data, total };
    } catch (error: any) {
      console.log(error);

      throw new Error(error.message);
    }
  }
}

type Input = {
  category?: string;
  page: number;
  items: number;
};
