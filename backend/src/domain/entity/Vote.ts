export default class Vote {
  constructor(
    public id: string,
    public pautaId: string,
    public vote: VoteEnum,
    public updatedAt: Date,
    public createdAt: Date
  ) {}
}

export enum VoteEnum {
  SIM = 'sim',
  NAO = 'nao',
}
