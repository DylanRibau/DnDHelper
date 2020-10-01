import { SimpleKVstring } from './SimpleKVstring';

export class LegendaryActions{
  value: string;
  amount: number;
  actions: Array<SimpleKVstring>;

  constructor() {
    this.actions = new Array<SimpleKVstring>();
  }
}
