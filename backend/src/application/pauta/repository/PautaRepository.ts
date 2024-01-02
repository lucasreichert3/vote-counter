import { Pauta, Prisma, Session } from '@prisma/client';
import { ListData } from '../../../infra/database/Connection';

export interface PautaRepository {
  create(pauta: Prisma.PautaCreateInput): Promise<Pauta>;
  findAll(
    filter: Prisma.PautaWhereInput,
    take?: number,
    skip?: number
  ): Promise<ListData<PautaDatabase>>;
  findOne(
    id: string,
    includeKey?: string[]
  ): Promise<PautaDatabase | undefined>;
}

export interface PautaDatabase extends Pauta {
  session?: Session;
}
