import { Injectable } from '@angular/core';
import * as EncounterXPHelper from "@src/assets/util/Encounter XP Helper.json";

@Injectable({
  providedIn: 'root'
})
export class UtilService{
  constructor() { }

  calculateAbilityModifier(score){
    return Math.floor((score - 10) / 2);
  }

  calculateInitiative(creature){
    return Math.floor(Math.random() * 20) + 1 + this.calculateAbilityModifier(creature.creature.dexterity);
  }

  generateListItemString(elements, useNumberSignFlag){
    var string = "";
    elements.forEach(element => {
      string = string + ", " + element.name;
      if(useNumberSignFlag){
        string = string + " " + this.generateNumberWithSignString(element.value);
      } else {
        string = string + " " + element.value;
      }
    });
    return string.substring(1);
  }

  generateNumberWithSignString(number){
    if(number >= 0){
      return "+" + number;
    }
    return number;
  }

  calculateModifierString(modifier){
    var number = this.calculateAbilityModifier(modifier);
    return this.generateNumberWithSignString(number);
  }

  generateSimpleListItemString(elements){
    var string = "";
    elements.forEach(element => {
      string = string + ", " + element;
    });
    return string.substring(1);
  }

  crtoxp(cr){
    return EncounterXPHelper.conversion[cr];
  }

  encounterMultiplier(numOfCreatures){
    if(numOfCreatures > 15)
      numOfCreatures = 15;
    return EncounterXPHelper.encounter_multiplier[numOfCreatures];
  }

  levelToXpThreshold(level){
    var totalLevel = 0;
    level.forEach(element => {
      totalLevel += element.value;
    });
    return EncounterXPHelper.threshold[totalLevel];
  }

  getIndex(array, creature){
    return array.map(function(item){
      return item._id
    }).indexOf(creature._id);
  }

  strPadLeft(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
  }
}
