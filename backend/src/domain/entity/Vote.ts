export interface Vote {
  id: string;
  pautaId: string;
  vote: VoteEnum;
  updatedAt: Date;
  createdAt: Date;
}

export enum VoteEnum {
  SIM = 'sim',
  NAO = 'nao',
}
