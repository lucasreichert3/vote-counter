import { PrismaClient } from '@prisma/client';
import Connection, { ConnectionParam } from './Connection';

export default class MongoConnection<T> implements Connection<T> {
  private prisma = new PrismaClient();

  create({ table, params }: ConnectionParam): Promise<T> {
    return this.prisma[table].create({ data: params });
  }

  update(params: any): Promise<any> {
    throw new Error('Method not implemented.');
  }

  delete({ table, params }: ConnectionParam): Promise<any> {
    return this.prisma[table].delete({ where: params });
  }

  findAll({ table }: ConnectionParam): Promise<any> {
    return this.prisma[table].findMany();
  }

  findOne({ params, table }: ConnectionParam): Promise<T> {
    return this.prisma[table].findUnique({ where: params });
  }
}
