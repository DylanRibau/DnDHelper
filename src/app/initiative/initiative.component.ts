import { Component, OnInit, Inject } from '@angular/core';
import { CreaturesService } from '@app/creatures/creatures.service';
import { UtilService } from '@app/util/util.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData{
  creatures: Array<any>;
  combat: boolean;
}

@Component({
  selector: 'app-initiative',
  templateUrl: './initiative.component.html',
  styleUrls: ['./initiative.component.css']
})
export class InitiativeComponent implements OnInit {
  creatures = [];
  combatSetupCreatures = [];
  combatSetup = true;

  combatCreatures = [];
  rounds = 0;
  turn = 0;
  currentCreature = null;

  constructor(private creaturesService: CreaturesService,
              private dialog: MatDialog,
              private utilService: UtilService) { }

  ngOnInit(): void {

  }

  openDialog(){
    this.creatures = [];
    this.creaturesService.getAllCreatures().subscribe(data => {
      for(const[key, value] of Object.entries(data)){
        this.creatures.push(value);
      };
    });
    let passingData = { creatures: this.creatures, combat: false};
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = passingData;
    dialogConfig.width = '500px';
    let dialogRef = this.dialog.open(CombatDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
      if(value != null){
        var newCreature = Object.assign({}, value);
        if(!value.amount){
          newCreature.amount = 1;
        }
        var existing = this.combatSetupCreatures.find(element => element._id == newCreature._id);
        if(!existing){
          this.combatSetupCreatures.push(newCreature);
          return;
        }
        existing.amount = existing.amount + newCreature.amount;
      };
    });
  }

  openDialogInCombat(){
    this.creatures = [];
    this.creaturesService.getAllCreatures().subscribe(data => {
      for(const[key, value] of Object.entries(data)){
        this.creatures.push(value);
      };
    });

    let passingData = { creatures: this.creatures, combat: true};
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = passingData;
    dialogConfig.width = '500px';
    let dialogRef = this.dialog.open(CombatDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
      if(value != null){
        var newCreature = Object.assign({}, value);
        this.setupCreature(newCreature);
        var existing = this.combatCreatures.filter(element => element._id == newCreature._id);
        if(existing.length > 0){
          var newCreatureInfo = Object.assign({}, newCreature.creature);
          newCreatureInfo.name = newCreatureInfo.name + " #" + ++existing.length ;
          newCreature.creature = newCreatureInfo;
        }
        this.combatCreatures.push(newCreature);
      };

      this.sortInCombat();
    });
  }

  startCombat(){
    this.combatSetup = false;
    var newCreature;
    var newCreatureInfo;

    this.combatSetupCreatures.forEach(element => {
      if(element.amount == 1){
        this.setupCreature(element);
        this.combatCreatures.push(element);
      } else {
        for(var i = 1; i <= element.amount; i++){
          newCreature = Object.assign({}, element);
          newCreatureInfo = Object.assign({}, element.creature);
          this.setupCreature(newCreature);
          newCreatureInfo.name = newCreatureInfo.name + " #" + i;

          newCreature.creature = newCreatureInfo;
          this.combatCreatures.push(newCreature);
        };
      }
    });

    this.sortInCombat();
  }

  setupCreature(creature){
    creature.initiative = this.utilService.calculateInitiative(creature);
    creature.current_hit_points = creature.creature.hit_points;
    creature.class = "";
  }

  initializeCombat(){
    this.rounds = 1;
    this.turn = 1;
    this.currentCreature = this.combatCreatures[0];
    this.currentCreature.class = "current-creature";
  }

  nextTurn(){
    this.currentCreature.class = "";
    var index = this.combatCreatures.indexOf(this.currentCreature);
    if(++index < this.combatCreatures.length){
      this.currentCreature = this.combatCreatures[index];
      this.turn++;
    } else {
      this.currentCreature = this.combatCreatures[0];
      this.turn = 1;
      this.rounds++;
    }
    this.currentCreature.class = "current-creature";
  }

  sortInCombat(){
    this.combatCreatures.sort((a, b) => {
      if(a.initiative == b.initiative){
        if(a.creature.dexterity == b.creature.dexterity){
          return a.creature.name.localeCompare(b.creature.name);
        }
        return b.creature.dexterity - a.creature.dexterity;
      }
      return b.initiative - a.initiative;
    });
  }
}

@Component({
  selector: 'initiative-dialog',
  templateUrl: './initiative.dialog.html',
  styleUrls: ['./initiative.dialog.css']
})
export class CombatDialogComponent{
  keyword = "";
  prevKeyword = "";
  filteredCreatures = [];

  constructor(public dialogRef: MatDialogRef<CombatDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData){
    this.filteredCreatures = data.creatures;
  };

  close() {
    this.dialogRef.close(null);
  };

  search(event){
    if(this.keyword == ""){
      if(this.keyword != this.prevKeyword){
        this.filteredCreatures = [];
        this.data.creatures.forEach(element => {
          this.filteredCreatures.push(element);
        });
        this.prevKeyword = this.keyword;
      }
      return
    };

    this.filteredCreatures = [];
    this.data.creatures.forEach(element => {
      if(element.creature.name.toLowerCase().indexOf(this.keyword.toLowerCase()) != -1)
        this.filteredCreatures.push(element);
    });
    this.prevKeyword = this.keyword;
  };

  addCreature(creature){
    this.dialogRef.close(creature);
  };
}
