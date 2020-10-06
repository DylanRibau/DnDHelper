import { Component, OnInit } from '@angular/core';
import { AddCreaturesService } from './add-creatures.service';
import { IResponse } from '@app/data/api-response';
import { Creature } from '@app/model/Creature';
import { SimpleKVnumber } from '@app/model/SimpleKVnumber';
import { SimpleKVstring } from '@app/model/SimpleKVstring';
import { InnateSpellcasting } from '@app/model/InnateSpellcasting';
import { Spellcasting } from '@app/model/Spellcasting';
import { Action } from '@app/model/Action';
import { TimeConstraint } from '@app/model/TimeConstraint';
import { SpellcastingLevel } from '@app/model/SpellcastingLevel';
import { LegendaryActions } from '@app/model/LegendaryActions';

@Component({
  selector: 'app-add-creatures',
  templateUrl: './add-creatures.component.html',
  styleUrls: ['./add-creatures.component.css']
})
export class AddCreaturesComponent implements OnInit {
  creature:Creature = new Creature();
  savingThrowOptions: Array<string> = [
    "Str", "Dex", "Con", "Int", "Wis", "Cha"
  ];
  status = "";
  title = "";
  fileUploaded: File;

  constructor(private creaturesService: AddCreaturesService) { }

  ngOnInit(): void {
    if(this.creaturesService.creature){
      this.creature = this.creaturesService.creature.creature;
      this.title = "Editing " + this.creature.name;
    } else {
      this.title = "New Creature"
    }
  };

  addEntry(field){
    switch(field){
      case 'speed':
      case 'senses':
      case 'special_abilities':
      case 'reactions':
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
        if(this.creature[field] == undefined){
          this.creature[field] = new Array<Action>();
        }
        this.creature[field].push(new Action());
        break;
      case 'legendary_actions':
        if(this.creature.legendary_actions == undefined)
          this.creature.legendary_actions = new LegendaryActions();

        this.creature.legendary_actions.actions.push(new SimpleKVstring());
        break;
      case 'innate_spellcasting':
        if(this.creature.innate_spellcasting == undefined)
          this.creature.innate_spellcasting = new InnateSpellcasting();

        this.creature.innate_spellcasting.time_constraint.push(new TimeConstraint());
        break;
      case 'spellcasting':
        if(this.creature.spellcasting == undefined)
          this.creature.spellcasting = new Spellcasting();

        this.creature.spellcasting.levels.push(new SpellcastingLevel());
        break;
      default:
        break;
    }
  }

  addSpell(obj: TimeConstraint | SpellcastingLevel){
    obj.spells.push("");
  }

  addLegendaryAction(){
    this.creature.legendary_actions.actions.push(new SimpleKVstring());
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
    this.fileUploaded = null;
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  removeEntry(origin, entry){
    let index = origin.indexOf(entry);
    if(index > -1)
      origin.splice(index, 1);
    return;
  }

  clearField(field){
    delete this.creature[field];
  }

  fileInput(files: FileList){
    this.fileUploaded = files.item(0);
  }

  importCreature(){
    if(this.fileUploaded){
      let reader = new FileReader();
      let fileCreature:Creature;
      reader.onload = function(){
        let fileContent:string = reader.result as string;
        fileCreature = JSON.parse(reader.result as string);
      };
      reader.onerror = function(){
        console.log(reader.error);
      };
      reader.onloadend = () => {
        this.creature = fileCreature;
        this.fileUploaded = null;
      };
      reader.readAsText(this.fileUploaded);
    }
  }
}
