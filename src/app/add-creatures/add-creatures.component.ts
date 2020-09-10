import { Component, OnInit } from '@angular/core';
import { AddCreaturesService } from './add-creatures.service';
import { IResponse } from '@app/data/api-response.js';
import { Creature } from '@app/model/Creature.ts';
import { SimpleKVnumber } from '@app/model/SimpleKVnumber.ts';
import { SimpleKVstring } from '@app/model/SimpleKVstring.ts';

@Component({
  selector: 'app-add-creatures',
  templateUrl: './add-creatures.component.html',
  styleUrls: ['./add-creatures.component.css']
})
export class AddCreaturesComponent implements OnInit {
  creature = new Creature();
  speed = new SimpleKVstring();

  constructor(private creaturesService: AddCreaturesService) { }

  ngOnInit(): void {
    // Default values for testing purposes
    this.creature.name = "Goblin";
    this.creature.size = "Small";
    this.creature.type = "humanoid";
    this.creature.subtype = "goblinoid";
    this.creature.alignment = "neutral evil";
    this.creature.armor_class = 15;
    this.creature.hit_points = 7;
    this.creature.hit_dice = "2d6";


    // var editCreature = this.creaturesService.creature;
    // if(editCreature != null){
    //
    // };
    this.creature.speed = new Array<SimpleKVstring>();
  };

  addCreature(){
    console.log(this.creature);
  }

  addSpeed(){
    if(this.speed.value != undefined){
      if(this.speed.name == undefined){
        this.speed.name = "";
      }
      this.creature.speed.push(this.speed);
    }
  }
}
