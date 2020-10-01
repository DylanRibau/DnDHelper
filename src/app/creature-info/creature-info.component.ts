import { Component, OnInit, Input } from '@angular/core';
import { UtilService } from '@app/util/util.service';
import { CreatureDisplay } from '@app/model/CreatureDisplay';
import { SimpleKVstring } from '@app/model/SimpleKVstring';

@Component({
  selector: 'creature-info',
  templateUrl: './creature-info.component.html',
  styleUrls: ['./creature-info.component.css']
})
export class CreatureInfoComponent implements OnInit {
  @Input() creature;
  creatureDisplay:CreatureDisplay;

  constructor(public utilService: UtilService) { }

  ngOnInit(): void {
    this.generateDisplayString();
  };

  generateDisplayString(){
    this.creatureDisplay = new CreatureDisplay(this.creature.creature);

    this.creatureDisplay.speed = this.utilService.generateListItemString(this.creature.creature.speed, false);

    this.creatureDisplay.str = `${this.creature.creature.strength} (${this.utilService.calculateModifierString(this.creature.creature.strength)})`;
    this.creatureDisplay.dex = `${this.creature.creature.dexterity} (${this.utilService.calculateModifierString(this.creature.creature.dexterity)})`;
    this.creatureDisplay.con = `${this.creature.creature.constitution} (${this.utilService.calculateModifierString(this.creature.creature.constitution)})`;
    this.creatureDisplay.int = `${this.creature.creature.intelligence} (${this.utilService.calculateModifierString(this.creature.creature.intelligence)})`;
    this.creatureDisplay.wis = `${this.creature.creature.wisdom} (${this.utilService.calculateModifierString(this.creature.creature.wisdom)})`;
    this.creatureDisplay.cha = `${this.creature.creature.charisma} (${this.utilService.calculateModifierString(this.creature.creature.charisma)})`;

    if(this.creature.creature.saving_throws != null)
      this.creatureDisplay.saving_throws = this.utilService.generateListItemString(this.creature.creature.saving_throws, true);
    if(this.creature.creature.skills != null)
      this.creatureDisplay.skills = this.utilService.generateListItemString(this.creature.creature.skills, true);
    if(this.creature.creature.damage_vulnerabilities != null)
      this.creatureDisplay.damage_vulnerabilities = this.utilService.generateSimpleListItemString(this.creature.creature.damage_vulnerabilities);
    if(this.creature.creature.damage_resistances != null)
      this.creatureDisplay.damage_resistances = this.utilService.generateSimpleListItemString(this.creature.creature.damage_resistances);
    if(this.creature.creature.damage_immunities != null)
      this.creatureDisplay.damage_immunities = this.utilService.generateSimpleListItemString(this.creature.creature.damage_immunities);
    if(this.creature.creature.condition_immunities != null)
      this.creatureDisplay.condition_immunities = this.utilService.generateSimpleListItemString(this.creature.creature.condition_immunities);
    if(this.creature.creature.senses != null)
      this.creatureDisplay.senses = this.utilService.generateListItemString(this.creature.creature.senses, false);

    if(this.creature.creature.innate_spellcasting != null){
      this.creatureDisplay.innate_spells = new Array<SimpleKVstring>();
      this.creature.creature.innate_spellcasting.time_constraint.forEach(element => {
        var spells = "";
        element.spells.forEach(spell => {
          spells = spells + ", " + spell;
        });

        var entry = new SimpleKVstring();
        if(element.per_day.toLowerCase() == "at will"){
          entry.name = "At will"
        } else {
          entry.name = element.per_day + "/day each";
        }
        entry.value = spells.substring(2);
        this.creatureDisplay.innate_spells.push(entry);
      });
    };

    if(this.creatureDisplay.spellcasting != null){
      this.creatureDisplay.spellcasting_spells = new Array<SimpleKVstring>();
      this.creature.creature.spellcasting.levels.forEach(element => {
        var spells = "";
        element.spells.forEach(spell => {
          spells = spells + ", " + spell;
        });

        var entry = new SimpleKVstring();
        entry.value = spells.substring(2);

        if(element.level.toLowerCase() == "cantrips"){
          entry.name = "Cantrips (at will)";
        } else {
          entry.name = `${element.level} (${element.slots} slots)`;
        }

        this.creatureDisplay.spellcasting_spells.push(entry);
      });
    };
  };
}
