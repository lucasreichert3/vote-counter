import { Pauta, Prisma } from '@prisma/client';
import {
  PautaDatabase,
  PautaRepository,
} from '../../../application/pauta/repository/PautaRepository';
import Connection, { ListData } from '../../database/Connection';

export default class PautaDatabaseRepository implements PautaRepository {
  private table = 'pauta';

  constructor(readonly connection: Connection<PautaDatabase>) {}

  findByCategory(
    category: string,
    take?: number,
    skip?: number
  ): Promise<ListData<PautaDatabase>> {
    return this.connection.findAll(
      {
        table: this.table,
        params: { category },
        includeKey: ['session'],
      },
      take,
      skip
    );
  }

  create(pauta: Prisma.PautaCreateInput): Promise<Pauta> {
    return this.connection.create({
      table: this.table,
      params: pauta,
    });
  }

  findAll(take?: number, skip?: number): Promise<ListData<PautaDatabase>> {
    return this.connection.findAll(
      { table: this.table, includeKey: ['session'] },
      take,
      skip
    );
  }

  findOne(id: string): Promise<PautaDatabase> {
    return this.connection.findOne({ table: this.table, params: { id } });
  }
}
