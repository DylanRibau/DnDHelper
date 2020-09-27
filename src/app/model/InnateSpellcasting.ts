import { TimeConstraint } from './TimeConstraint';

export class InnateSpellcasting{
  value: string;
  time_constraint: Array<TimeConstraint>;

  constructor() {
    this.time_constraint = new Array<TimeConstraint>();
  }
}
