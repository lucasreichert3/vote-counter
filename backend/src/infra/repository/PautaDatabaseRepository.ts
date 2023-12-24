import { Pauta, Prisma } from '@prisma/client';
import { PautaRepository } from '../../application/repository/PautaRepository';
import Connection from '../database/Connection';

export default class PautaDatabaseRepository implements PautaRepository {
  private table = 'pauta';

  constructor(readonly connection: Connection<Pauta>) {}

  async create(pauta: Prisma.PautaCreateInput): Promise<Pauta> {
    return await this.connection.create({
      table: this.table,
      params: pauta,
    });
  }

  update(pauta: Prisma.PautaUpdateInput): Promise<Pauta> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<void> {
    return this.connection.delete({ table: this.table, params: { id } });
  }

  findAll(): Promise<Pauta[]> {
    return this.connection.findAll({ table: this.table });
  }

  findOne(id: string): Promise<Pauta> {
    return this.connection.findOne({ table: this.table, params: { id } });
  }
}
