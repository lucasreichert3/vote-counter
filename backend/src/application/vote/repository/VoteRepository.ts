import { Prisma, Vote } from '@prisma/client';
import { ListData } from '../../../infra/database/Connection';

export interface VoteRepository {
  create(pauta: Prisma.VoteCreateInput): Promise<Vote>;
  findAll(
    take?: number,
    skip?: number,
    includeKey?: string[]
  ): Promise<ListData<Vote>>;
  findOne(id: string, includeKey?: string[]): Promise<Vote>;
}
