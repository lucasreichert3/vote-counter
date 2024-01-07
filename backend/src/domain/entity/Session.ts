import { Pauta, Vote } from '@prisma/client';

export default class Session {
  constructor(
    public id: string,
    public pautaId: string,
    public closeDate: Date,
    public updatedAt: Date,
    public createdAt: Date,
    public pauta?: Pauta,
    public totalVotes?: number,
    public inFavor?: number,
    public against?: number
  ) {}

  get isOpen() {
    return this.closeDate > new Date();
  }
}
