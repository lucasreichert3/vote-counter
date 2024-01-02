import { Prisma, Vote } from '@prisma/client';
import {
  VoteDatabase,
  VoteRepository,
} from '../../../application/vote/repository/VoteRepository';
import Connection, { ListData } from '../../database/Connection';

export default class VoteDatabaseRepository implements VoteRepository {
  private table = 'vote';

  constructor(private connection: Connection<VoteDatabase>) {}

  create(pauta: Prisma.VoteCreateInput): Promise<Vote> {
    return this.connection.create({ table: this.table, params: pauta });
  }

  findAll(
    filter: Prisma.VoteWhereInput,
    skip?: number,
    take?: number,
    includeKey?: string[]
  ): Promise<ListData<VoteDatabase>> {
    return this.connection.findAll(
      { table: this.table, includeKey, params: filter },
      take,
      skip
    );
  }

  findOne(id: string, includeKey?: string[]): Promise<Vote> {
    return this.connection.findOne({
      table: this.table,
      params: { id },
      includeKey,
    });
  }

  findVotesBySessionIdAndUserId(
    sessionId: string,
    userId: string
  ): Promise<ListData<Vote>> {
    return this.connection.findAll({
      table: this.table,
      params: { sessionId, userId },
    });
  }
}
