import { Prisma, Vote } from '@prisma/client';
import { VoteRepository } from '../../../application/vote/repository/VoteRepository';
import Connection, { ListData } from '../../database/Connection';

export default class VoteDatabaseRepository implements VoteRepository {
  private table = 'vote';

  constructor(private connection: Connection<Vote>) {}

  create(pauta: Prisma.VoteCreateInput): Promise<Vote> {
    return this.connection.create({ table: this.table, params: pauta });
  }

  findAll(
    skip?: number,
    take?: number,
    includeKey?: string[]
  ): Promise<ListData<Vote>> {
    return this.connection.findAll(
      { table: this.table, includeKey },
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
}
