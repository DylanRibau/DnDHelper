import { SpellcastingLevel } from './SpellcastingLevel';

export class Spellcasting{
  value: string;
  levels: Array<SpellcastingLevel>;

  constructor(){
    this.levels = new Array<SpellcastingLevel>();
  }
}
