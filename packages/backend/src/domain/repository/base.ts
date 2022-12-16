export interface IBaseRepository<T> {
  create(data: T): Promise<T>;

  getAll(): Promise<T[]>;

  getById(id: string): Promise<T>;

  updateById(id: string, data: T): Promise<T>;

  deleteById(id: string): Promise<T>;
}
