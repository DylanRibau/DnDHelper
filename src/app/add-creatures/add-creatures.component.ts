import { Component, OnInit } from '@angular/core';
import { AddCreaturesService } from './add-creatures.service';
import { IResponse } from '@app/data/api-response.js';

@Component({
  selector: 'app-add-creatures',
  templateUrl: './add-creatures.component.html',
  styleUrls: ['./add-creatures.component.css']
})
export class AddCreaturesComponent implements OnInit {
  //{"name":"123"}
  creatureEdit;
  creatureJson = "";
  statusMessage = "Enter JSON";
  statusMessageClass = "status-message-default";

  constructor(private creaturesService: AddCreaturesService) { }

  ngOnInit(): void {
    var creature = this.creaturesService.creature;
    if(creature != null){
      this.creatureEdit = creature;
      this.creatureJson = JSON.stringify(creature.creature);
      this.statusMessage = "Editing " + creature.creature.name;
      this.creaturesService.creature = null;
    };
  };

  addCreature(){
    var parsedInput = tryParseJson(this.creatureJson);

    if(parsedInput == false){
      return;
    }

    if(this.creatureEdit != null){
      this.creatureEdit.creature = tryParseJson(this.creatureJson);
      this.creaturesService.putCreature(this.creatureEdit).subscribe(function(data: IResponse){
        this.statusMessage = data.message;
      });
      return;
    }

    this.creaturesService.postCreature(parsedInput).subscribe(function(data: IResponse) {
      this.statusMessage = data.message
    });
  };

  blurEvent(){
    if(this.creatureJson.trim() == ""){
      this.statusMessage = "Enter JSON";
      this.statusMessageClass = "status-message-default";
      this.creatureEdit = null;
      return;
    }

    var parsedInput = tryParseJson(this.creatureJson);

    if(parsedInput == false){
      this.statusMessage = "Invalid JSON";
      this.statusMessageClass = "status-message-invalid";
      return;
    }
    this.statusMessage = "Valid JSON";
    this.statusMessageClass = "status-message-success";
  };

  resetJSON(){
    if(confirm("Are you sure?")){
      this.creatureJson = "";
      this.statusMessage = "Enter JSON";
      this.statusMessageClass = "status-message-default";
    }
  };
}

function tryParseJson(str){
  try{
    var jsonObj = JSON.parse(str);

    if(jsonObj && typeof jsonObj === "object"){
      return jsonObj;
    }
  } catch(e){ }

  return false;
}
