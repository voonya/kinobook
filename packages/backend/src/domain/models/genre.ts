import { BaseModel } from './base';

export class Genre extends BaseModel {
  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}
