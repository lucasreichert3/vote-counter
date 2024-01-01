import { Prisma } from '@prisma/client';
import {
  SessionDatabase,
  SessionRepository,
} from '../../../application/session/repository/SessionRepository';
import Connection, { ListData } from '../../database/Connection';

export default class SessionDatabaseRepository implements SessionRepository {
  private table = 'session';

  constructor(readonly connection: Connection<SessionDatabase>) {}

  create(session: Prisma.SessionCreateInput): Promise<SessionDatabase> {
    return this.connection.create({
      table: this.table,
      params: session,
    });
  }

  async findAll(
    skip?: number,
    take?: number,
    includeKey?: string[]
  ): Promise<ListData<SessionDatabase>> {
    return this.connection.findAll(
      { table: this.table, includeKey },
      take,
      skip
    );
  }

  async findOne(id: string, includeKey?: string[]): Promise<SessionDatabase> {
    const result = await this.connection.findOne({
      table: this.table,
      params: { id },
      includeKey,
    });

    return result;
  }
}
