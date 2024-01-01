import Pauta from '../../../domain/entity/Pauta';
import { PautaRepository } from '../repository/PautaRepository';

export default class CreatePauta {
  constructor(private pautaRepository: PautaRepository) {}

  async execute(input: Input): Promise<Pauta> {
    try {
      const { title, category, description } = input;

      const result = await this.pautaRepository.create({
        title,
        description,
        category,
      });

      const { id, createdAt, updatedAt } = result;

      return new Pauta(
        id,
        title,
        category,
        createdAt,
        updatedAt,
        description || null
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

type Input = {
  title: string;
  category: string;
  description?: string;
};
