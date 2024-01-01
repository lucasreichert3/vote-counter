import { PrismaClient } from '@prisma/client';
import Connection, { ConnectionParam } from './Connection';

export default class MongoConnection<T> implements Connection<T> {
  private prisma = new PrismaClient();

  create({ table, params }: ConnectionParam): Promise<T> {
    return this.prisma[table].create({ data: params });
  }

  update({ table, params, id }: ConnectionParam): Promise<any> {
    return this.prisma[table].update({
      where: { id },
      data: { ...params },
    });
  }

  delete({ table, params }: ConnectionParam): Promise<any> {
    return this.prisma[table].delete({ where: params });
  }

  async findAll(
    { table, params, includeKey }: ConnectionParam,
    take?: number,
    skip?: number
  ): Promise<any> {
    const total = await this.prisma[table].count();

    const data = await this.prisma[table].findMany({
      where: params,
      take,
      skip,
      include: this.getIncludeKey(includeKey),
    });

    return { data, total };
  }

  findOne({ params, table, includeKey }: ConnectionParam): Promise<T> {
    return this.prisma[table].findUnique({
      where: params,
      include: this.getIncludeKey(includeKey),
    });
  }

  getIncludeKey(includeKey?: string[]) {
    const include = {};

    if (includeKey)
      includeKey.forEach((key) => {
        include[key] = true;
      });

    return include;
  }
}
