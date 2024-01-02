import { Pauta, Vote } from '@prisma/client';

export default class Session {
  constructor(
    public id: string,
    public pautaId: string,
    public closeDate: Date,
    public updatedAt: Date,
    public createdAt: Date,
    public votes?: Vote[],
    public pauta?: Pauta
  ) {}

  get isOpen() {
    return this.closeDate > new Date();
  }
}
