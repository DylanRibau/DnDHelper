import { Injectable } from '@angular/core';

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
      string = string + ", " + element.name;
    });
    return string.substring(1);
  }
}
