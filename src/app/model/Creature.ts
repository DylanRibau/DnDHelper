import { SimpleKVnumber } from './SimpleKVnumber';
import { SimpleKVstring } from './SimpleKVstring';

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
}
