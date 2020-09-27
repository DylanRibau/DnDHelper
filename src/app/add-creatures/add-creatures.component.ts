import { Component, OnInit } from '@angular/core';
import { AddCreaturesService } from './add-creatures.service';
import { IResponse } from '@app/data/api-response.js';
import { Creature } from '@app/model/Creature.ts';
import { SimpleKVnumber } from '@app/model/SimpleKVnumber.ts';
import { SimpleKVstring } from '@app/model/SimpleKVstring.ts';
import { InnateSpellcasting } from '@app/model/InnateSpellcasting.ts';
import { Spellcasting } from '@app/model/Spellcasting.ts';
import { Action } from '@app/model/Action.ts';
import { TimeConstraint } from '@app/model/TimeConstraint.ts';
import { SpellcastingLevel } from '@app/model/SpellcastingLevel.ts';

@Component({
  selector: 'app-add-creatures',
  templateUrl: './add-creatures.component.html',
  styleUrls: ['./add-creatures.component.css']
})
export class AddCreaturesComponent implements OnInit {
  creature = new Creature();
  savingThrowOptions: Array<string> = [
    "Str", "Dex", "Con", "Int", "Wis", "Cha"
  ];

  constructor(private creaturesService: AddCreaturesService) { }

  ngOnInit(): void {
    // Default values for testing purposes
    // this.creature.name = "Goblin";
    // this.creature.size = "Small";
    // this.creature.type = "humanoid";
    // this.creature.subtype = "goblinoid";
    // this.creature.alignment = "neutral evil";
    // this.creature.armor_class = 15;
    // this.creature.hit_points = 7;
    // this.creature.hit_dice = "2d6";
    // this.creature.strength = 10;
    // this.creature.dexterity = 12;
    // this.creature.constitution = 14;
    // this.creature.intelligence = 15;
    // this.creature.wisdom = 17;
    // this.creature.charisma = 7;
    // this.creature.speed = new Array<SimpleKVstring>();
    // this.creature.saving_throws = new Array<SimpleKVnumber>();
    // this.creature.skills = new Array<SimpleKVnumber>();
    // this.creature.damage_vulnerabilities = new Array<string>();
    // this.creature.damage_resistances = new Array<string>();
    // this.creature.damage_immunities = new Array<string>();
    // this.creature.condition_immunities = new Array<string>();
    // this.creature.senses = new Array<SimpleKVstring>();
    // this.creature.special_abilities = new Array<SimpleKVstring>();
    // this.creature.innate_spellcasting = new InnateSpellcasting();
    // this.creature.spellcasting = new Spellcasting();
    // this.creature.actions = new Array<Action>();
    // this.creature.legendary_actions = new Array<Action>();
    // this.creature.source = new Array<SimpleKVnumber>();
    // special_abilities: Array<SimpleKVstring>;
    // innate_spellcasting: InnateSpellcasting;
    // spellcasting: Spellcasting;
    // actions: Array<Action>;
    // legendary_actions: Array<Action>;
    // source: Array<SimpleKVnumber>;

    //Initial setup
    // this.creature.speed.push(new SimpleKVstring());
  };

  addEntry(field){
    switch(field){
      case 'speed':
      case 'senses':
      case 'special_abilities':
        if(this.creature[field] == undefined){
          this.creature[field] = new Array<SimpleKVstring>();
        }
        this.creature[field].push(new SimpleKVstring());
        break;
      case 'saving_throws':
      case 'skills':
      case 'source':
      case 'level':
        if(this.creature[field] == undefined){
          this.creature[field] = new Array<SimpleKVnumber>();
        }
        this.creature[field].push(new SimpleKVnumber());
        break;
      case 'damage_vulnerabilities':
      case 'damage_resistances':
      case 'damage_immunities':
      case 'condition_immunities':
        if(this.creature[field] == undefined){
          this.creature[field] = new Array<string>();
        }
        this.creature[field].push("");
        break;
      case 'actions':
      case 'legendary_actions':
        if(this.creature[field] == undefined){
          this.creature[field] = new Array<Action>();
        }
        this.creature[field].push(new Action());
        break;
      case 'innate_spellcasting':
        if(this.creature.innate_spellcasting == undefined){
          this.creature.innate_spellcasting = new InnateSpellcasting();
        }
        this.creature.innate_spellcasting.time_constraint.push(new TimeConstraint());
        break;
      case 'spellcasting':
        if(this.creature.spellcasting == undefined){
          this.creature.spellcasting = new Spellcasting();
        }
        this.creature.spellcasting.levels.push(new SpellcastingLevel());
        break;
      default:
        break;
    }
  }

  addSpell(obj: TimeConstraint | SpellcastingLevel){
    obj.spells.push("");
  }

  addCreature(){
    if(this.creature.speed != undefined){
      this.creature.speed.forEach(element => {
        if(element.name == undefined){
          element.name = "";
        }
      });
    }
    console.log(this.creature);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
