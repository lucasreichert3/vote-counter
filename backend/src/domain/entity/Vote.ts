export default class Vote {
  constructor(
    public id: string,
    public pautaId: string,
    public vote: boolean,
    public userId: string,
    public sessionId: string,
    public updatedAt: Date,
    public createdAt: Date
  ) {}
}
