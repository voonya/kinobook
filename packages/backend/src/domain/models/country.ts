import { BaseModel } from './base';

export class Country extends BaseModel {
  name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}