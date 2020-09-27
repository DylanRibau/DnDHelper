export class SpellcastingLevel{
  level: number;
  slots: string;
  spells: Array<string>;

  constructor(){
    this.spells = new Array<string>();
  }
}
