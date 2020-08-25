import { Component, OnInit } from '@angular/core';
import { CreaturesService } from './creatures.service';
import { AddCreaturesService } from '@app/add-creatures/add-creatures.service';
import { IResponse } from '@app/data/api-response.js';
import { Router } from '@angular/router';

declare var prettyPrintJson: any;

@Component({
  selector: 'app-creatures',
  templateUrl: './creatures.component.html',
  styleUrls: ['./creatures.component.css']
})
export class CreaturesComponent implements OnInit {
  currentCreature = "";
  currentCreatureName = "";
  allCreatures = [];
  displayedCreatures = [];
  keyword = "";
  prevKeyword = "";
  leftClass = "left-alone";
  cardClass = "col-sm-2";

  constructor(private creaturesService: CreaturesService,
              private addCreatureService: AddCreaturesService,
              private router: Router) { }

  ngOnInit(): void {
    this.grabAllCreatures();
  };

  displayCreature(creature){
    this.currentCreature = prettyPrintJson.toHtml(creature.creature);
    this.currentCreatureName = creature.creature.name;
    this.leftClass = "left";
    this.cardClass = "col-sm-4";
  };

  grabAllCreatures(){
    this.creaturesService.getAllCreatures().subscribe(data => {
      for(const[key, value] of Object.entries(data)){
        this.allCreatures.push(value);
        this.displayedCreatures.push(value);
      };
    });
  };

  search(event){
    if(this.keyword == ""){
      if(this.keyword != this.prevKeyword){
        this.displayedCreatures = [];
        this.allCreatures.forEach(element => {
          this.displayedCreatures.push(element);
        });
        this.prevKeyword = this.keyword;
      }
      return
    };

    this.displayedCreatures = [];
    this.allCreatures.forEach(element => {
      if(element.creature.name.toLowerCase().indexOf(this.keyword.toLowerCase()) != -1)
        this.displayedCreatures.push(element);
    });
    this.prevKeyword = this.keyword;
  };

  deleteCreature(creature){
    if(confirm("Are you sure you want to delete: " + creature.creature.name + "?")){
      this.creaturesService.deleteCreature(creature._id).subscribe(function(data: IResponse) {
        if(data.message != "Successfully Deleted")
          return;
      });
    };

    var removeIndex = this.allCreatures.map(function(item) {
      return item._id;
    }).indexOf(creature._id);

    this.allCreatures.splice(removeIndex, 1);

    removeIndex = this.displayedCreatures.map(function(item) {
      return item._id;
    }).indexOf(creature._id);

    this.displayedCreatures.splice(removeIndex, 1);
  };

  collapseCreature(){
    this.currentCreature = "";
    this.currentCreatureName = "";
    this.leftClass = "left-alone";
    this.cardClass = "col-sm-2";
  };

  editCreature(creature){
    this.addCreatureService.creature = creature;
    this.router.navigateByUrl('/addCreatures');
  };
}
