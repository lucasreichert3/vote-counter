import { Session, Prisma, Pauta } from '@prisma/client';
import { ListData } from '../../../infra/database/Connection';

export interface SessionRepository {
  create(pauta: Prisma.SessionCreateInput): Promise<Session>;
  findAll(
    take?: number,
    skip?: number,
    includeKey?: string[]
  ): Promise<ListData<SessionDatabase>>;
  findOne(
    id: string,
    includeKey?: string[]
  ): Promise<SessionDatabase | undefined>;
}

export interface SessionDatabase extends Session {
  pauta?: Pauta;
}
