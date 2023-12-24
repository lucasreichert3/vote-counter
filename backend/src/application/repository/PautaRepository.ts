import { Pauta, Prisma } from '@prisma/client';

export interface PautaRepository {
  create(pauta: Prisma.PautaCreateInput): Promise<Pauta>;
  update(pauta: Prisma.PautaUpdateInput): Promise<Pauta>;
  delete(id: string): Promise<void>;
  findAll(): Promise<Pauta[]>;
  findOne(id: string): Promise<Pauta>;
}
