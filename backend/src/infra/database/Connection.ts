export default interface Connection<T> {
  create(params: ConnectionParam): Promise<T>;
  update(params: ConnectionParam): Promise<T>;
  delete(params: ConnectionParam): Promise<void>;
  findAll(
    params: ConnectionParam,
    take?: number,
    skip?: number
  ): Promise<ListData<T>>;
  findOne(params: ConnectionParam): Promise<T>;
}

export interface ConnectionParam {
  id?: string | number;
  table: string;
  params?: any;
  includeKey?: string[]
}

export interface ListData<T> {
  data: T[];
  total: number;
}
