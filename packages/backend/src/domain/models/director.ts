import { BaseModel } from './base';

export class Director extends BaseModel {
  name: string;

  surname: string;

  constructor(name: string, surname: string) {
    super();
    this.name = name;
    this.surname = surname;
  }
}
