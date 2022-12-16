export interface IEntityService<T> {
  getById(id: string): Promise<T>;

  getAll(): Promise<T[]>;

  deleteById(id: string): Promise<T>;

  updateById(id: string, data: T): Promise<T>;

  create(data: T): Promise<T>;
}
