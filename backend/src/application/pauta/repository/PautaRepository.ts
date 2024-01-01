import { Pauta, Prisma, Session } from '@prisma/client';
import { ListData } from '../../../infra/database/Connection';

export interface PautaRepository {
  create(pauta: Prisma.PautaCreateInput): Promise<Pauta>;
  findAll(take?: number, skip?: number): Promise<ListData<PautaDatabase>>;
  findOne(id: string): Promise<PautaDatabase>;
  findByCategory(
    category: string,
    take?: number,
    skip?: number
  ): Promise<ListData<PautaDatabase>>;
}

export interface PautaDatabase extends Pauta {
  session?: Session;
}
