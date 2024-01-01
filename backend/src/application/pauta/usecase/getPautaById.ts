import Pauta from '../../../domain/entity/Pauta';
import { PautaRepository } from '../repository/PautaRepository';

export default class GetPautaById {
  constructor(private pautaRepository: PautaRepository) {}

  async execute(input: Input): Promise<Pauta> {
    try {
      const { id } = input;

      const result = await this.pautaRepository.findOne(id);

      const { title, description, category, createdAt, updatedAt, session } =
        result;

      return new Pauta(
        id,
        title,
        category,
        createdAt,
        updatedAt,
        description,
        session
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

type Input = {
  id: string;
};
