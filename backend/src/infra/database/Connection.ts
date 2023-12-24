export default interface Connection<T> {
  create(params: ConnectionParam): Promise<T>;
  update(params: ConnectionParam): Promise<T>;
  delete(params: ConnectionParam): Promise<void>;
  findAll(params: ConnectionParam): Promise<T[]>;
  findOne(params: ConnectionParam): Promise<T>;
}

export interface ConnectionParam {
  table: string;
  params?: any;
}
