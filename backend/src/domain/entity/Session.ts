import Pauta from './Pauta';
import Vote from './Vote';

export default class Session {
  constructor(
    public id: string,
    public pautaId: string,
    public open: boolean,
    public openDate: Date,
    public duration: number,
    public updatedAt: Date,
    public createdAt: Date,
    public votes?: Vote[],
    public pauta?: Pauta
  ) {}
}
