import { SimpleKVnumber } from './SimpleKVnumber';
import { SimpleKVstring } from './SimpleKVstring';
import { InnateSpellcasting } from './InnateSpellcasting';
import { Spellcasting } from './Spellcasting';
import { Creature } from './Creature';
import { Action } from './Action';
import { LegendaryActions } from './LegendaryActions';

export class CreatureDisplay{
  name: string;
  size: string;
  type: string;
  subtype: string;
  alignment: string;
  ac: number;
  hp: number;
  hit_dice: string;
  speed: string;
  str: string;
  dex: string;
  con: string;
  int: string;
  wis: string;
  cha: string;
  saving_throws: string;
  skills: string;
  damage_vulnerabilities: string;
  damage_resistances: string;
  damage_immunities: string;
  condition_immunities: string;
  senses: string;
  languages: string;
  cr: string;
  special_abilities: Array<SimpleKVstring>;
  innate_spellcasting: InnateSpellcasting;
  innate_spells: Array<SimpleKVstring>;
  spellcasting: Spellcasting;
  spellcasting_spells: Array<SimpleKVstring>;
  actions: Array<Action>;
  legendary_actions: LegendaryActions;
  source: Array<SimpleKVnumber>;
  level: Array<SimpleKVnumber>;

  constructor(creature: Creature){
    this.name = creature.name;
    this.size = creature.size;
    this.type = creature.type;
    this.subtype = creature.subtype;
    this.alignment = creature.alignment;
    this.ac = creature.armor_class;
    this.hp = creature.hit_points;
    this.hit_dice = creature.hit_dice;
    this.languages = creature.languages;
    this.cr = creature.challenge_rating;
    this.special_abilities = creature.special_abilities;
    this.innate_spellcasting = creature.innate_spellcasting;
    this.spellcasting = creature.spellcasting;
    this.actions = creature.actions;
    this.legendary_actions = creature.legendary_actions;
    this.source = creature.source;
    this.level = creature.level;
  }
}
