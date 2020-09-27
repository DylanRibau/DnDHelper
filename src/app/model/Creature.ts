import { SimpleKVnumber } from './SimpleKVnumber';
import { SimpleKVstring } from './SimpleKVstring';
import { Action } from './Action';
import { InnateSpellcasting } from './InnateSpellcasting';
import { Spellcasting } from './Spellcasting';

export class Creature {
  name: string;
  size: string;
  type: string;
  subtype: string;
  alignment: string;
  armor_class: number;
  hit_points: number;
  hit_dice: string;
  speed: Array<SimpleKVstring>;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  saving_throws: Array<SimpleKVnumber>;
  skills: Array<SimpleKVnumber>;
  damage_vulnerabilities: Array<string>;
  damage_resistances: Array<string>;
  damage_immunities: Array<string>;
  condition_immunities: Array<string>;
  senses: Array<SimpleKVstring>;
  languages: string;
  challenge_rating: string;
  special_abilities: Array<SimpleKVstring>;
  innate_spellcasting: InnateSpellcasting;
  spellcasting: Spellcasting;
  actions: Array<Action>;
  legendary_actions: Array<Action>;
  source: Array<SimpleKVnumber>;
  level: Array<SimpleKVnumber>;
}
