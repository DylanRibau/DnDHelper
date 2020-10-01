export class SpellcastingLevel{
  level: string;
  slots: number;
  spells: Array<string>;

  constructor(){
    this.spells = new Array<string>();
  }
}
