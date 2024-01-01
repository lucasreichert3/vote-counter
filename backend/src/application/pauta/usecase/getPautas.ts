import Pauta from '../../../domain/entity/Pauta';
import { PautaRepository } from '../repository/PautaRepository';

export default class GetPautas {
  constructor(private pautaRepository: PautaRepository) {}

  async execute(input: Input): Promise<{ data: Pauta[]; total: number }> {
    const { category, page = 0, items = 10 } = input;

    const take = items;
    const skip = page * items;

    try {
      const result = category
        ? await this.pautaRepository.findByCategory(category, take, skip)
        : await this.pautaRepository.findAll(take, skip);

      const { data, total } = result;

      const items = data.map(
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

      return { data: items, total };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

type Input = {
  category?: string;
  page?: number;
  items?: number;
};
