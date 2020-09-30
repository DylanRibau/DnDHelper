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
  status = "";

  constructor(private creaturesService: AddCreaturesService) { }

  ngOnInit(): void {
    if(this.creaturesService.creature){
      this.creature = this.creaturesService.creature.creature;
    }

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
    // this.creature.languages = "Common";
    // this.creature.challenge_rating = "1/4";
    //
    // this.creature.speed = new Array<SimpleKVstring>();
    // var speed1 = new SimpleKVstring();
    // speed1.name = "";
    // speed1.value = "30 ft.";
    // var speed2 = new SimpleKVstring();
    // speed2.name = "climb";
    // speed2.value = "20 ft.";
    // this.creature.speed.push(speed1, speed2);
    //
    // this.creature.saving_throws = new Array<SimpleKVnumber>();
    // var savingThrow1 = new SimpleKVnumber();
    // savingThrow1.name = "Str";
    // savingThrow1.value = 3;
    // var savingThrow2 = new SimpleKVnumber();
    // savingThrow2.name = "Dex";
    // savingThrow2.value = 5;
    // this.creature.saving_throws.push(savingThrow1, savingThrow2);
    //
    // this.creature.skills = new Array<SimpleKVnumber>();
    // var skills1 = new SimpleKVnumber();
    // skills1.name = "Perception";
    // skills1.value = 9;
    // var skills2 = new SimpleKVnumber();
    // skills2.name = "Insight";
    // skills2.value = 6;
    // this.creature.skills.push(skills1, skills2);
    //
    // this.creature.damage_vulnerabilities = new Array<string>();
    // this.creature.damage_vulnerabilities.push("Piercing", "Slashing", "Bludgeoning");
    //
    // this.creature.damage_resistances = new Array<string>();
    // this.creature.damage_resistances.push("Cold", "Fire");
    //
    // this.creature.damage_immunities = new Array<string>();
    // this.creature.damage_immunities.push("Necrotic", "Poison");
    //
    // this.creature.condition_immunities = new Array<string>();
    // this.creature.condition_immunities.push("Grappled");
    //
    // this.creature.senses = new Array<SimpleKVstring>();
    // var senses1 = new SimpleKVstring();
    // senses1.name = "Darkvision";
    // senses1.value = "30 ft.";
    // var senses2 = new SimpleKVstring();
    // senses2.name = "passive Perception";
    // senses2.value = "124";
    // this.creature.senses.push(senses1, senses2);
    //
    // this.creature.special_abilities = new Array<SimpleKVstring>();
    // var specialabilities1 = new SimpleKVstring();
    // specialabilities1.name = "Nimble Escape";
    // specialabilities1.value = "The goblin can take the Disengage or Hide action as a bonus action on each of its turns.";
    // var specialabilities2 = new SimpleKVstring();
    // specialabilities2.name = "Pact Tactics";
    // specialabilities2.value = "Advantage if allies nearby";
    // this.creature.special_abilities.push(specialabilities1, specialabilities2);
    //
    // this.creature.innate_spellcasting = new InnateSpellcasting();
    // this.creature.innate_spellcasting.value = "The goblin's innate asfdubiudf";
    // var timeConstraint1 = new TimeConstraint();
    // timeConstraint1.per_day = "at will";
    // timeConstraint1.spells.push("Detect magic", "fog cloud");
    // var timeConstraint2 = new TimeConstraint();
    // timeConstraint2.per_day = "1";
    // timeConstraint2.spells.push("Feather fall", "Misty step");
    // this.creature.innate_spellcasting.time_constraint.push(timeConstraint1, timeConstraint2);
    //
    // this.creature.spellcasting = new Spellcasting();
    // this.creature.spellcasting.value = "The goblin is a 5th level spellcaster."
    // var levels1 = new SpellcastingLevel();
    // levels1.level = 0;
    // levels1.slots = "at will";
    // levels1.spells.push("Minor illusion", "Prestidigitation");
    // var levels2 = new SpellcastingLevel();
    // levels2.level = 1;
    // levels2.slots = "4";
    // levels2.spells.push("Burning Hands", "Suggestion");
    // this.creature.spellcasting.levels.push(levels1, levels2);
    //
    // this.creature.actions = new Array<Action>();
    // var action1 = new Action();
    // action1.name = "Scimitar";
    // action1.type = "Melee Weapon Attack";
    // action1.value = "+4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage.";
    // var action2 = new Action();
    // action2.name = "Shortbow";
    // action2.type = "Ranged Weapon Attack";
    // action2.value = "+4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.";
    // this.creature.actions.push(action1, action2);
    //
    // this.creature.legendary_actions = new Array<Action>();
    // var action3 = new Action();
    // action3.name = "Detect";
    // action3.value = "Detect things lmao";
    // var action4 = new Action();
    // action4.name = "BOOP";
    // action4.value = "Boop the creature on the head";
    // this.creature.legendary_actions.push(action3, action4);
    //
    // this.creature.source = new Array<SimpleKVnumber>();
    // var source = new SimpleKVnumber();
    // source.name = "Monster Manual";
    // source.value = 123;
    // this.creature.source.push(source);
    //
    // this.creature.level = new Array<SimpleKVnumber>();
    // var level1 = new SimpleKVnumber();
    // level1.name = "Fighter";
    // level1.value = 3;
    // var level2 = new SimpleKVnumber();
    // level2.name = "Cleric";
    // level2.value = 6;
    // this.creature.level.push(level1, level2);
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

    if(this.creaturesService.creature != null){
      this.creaturesService.creature.creature = this.creature;
      this.creaturesService.putCreature(this.creaturesService.creature).subscribe(function(data: IResponse){
      });
      this.creaturesService.creature = null;
    } else {
      this.creaturesService.postCreature(this.creature).subscribe(function(data: IResponse){});
      this.status = "Creature Successfully added";
    }
    this.creature = new Creature();
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
}
