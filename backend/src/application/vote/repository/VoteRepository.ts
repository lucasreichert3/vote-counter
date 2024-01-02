import { Prisma, Session, Vote } from '@prisma/client';
import { ListData } from '../../../infra/database/Connection';

export interface VoteRepository {
  create(pauta: Prisma.VoteCreateInput): Promise<Vote>;
  findAll(
    filter?: Prisma.VoteWhereInput,
    take?: number,
    skip?: number,
    includeKey?: string[]
  ): Promise<ListData<VoteDatabase>>;
  findOne(id: string, includeKey?: string[]): Promise<Vote>;
  findVotesBySessionIdAndUserId(
    sessionId: string,
    userId: string
  ): Promise<ListData<Vote>>;
}

export interface VoteDatabase extends Vote {
  session: Session;
}
