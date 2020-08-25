import { Component, OnInit, Inject } from '@angular/core';
import { CreaturesService } from '@app/creatures/creatures.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData{
  creatures: Array<any>;
}

@Component({
  selector: 'app-initiative',
  templateUrl: './initiative.component.html',
  styleUrls: ['./initiative.component.css']
})
export class InitiativeComponent implements OnInit {
  creatures = [];
  combatCreatures = [];
  combatSetup = true;

  constructor(private creaturesService: CreaturesService,
              private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  openDialog(){
    this.creatures = [];
    this.creaturesService.getAllCreatures().subscribe(data => {
      for(const[key, value] of Object.entries(data)){
        this.creatures.push(value);
      };
    });

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.creatures;
    dialogConfig.width = '500px';
    let dialogRef = this.dialog.open(CombatDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
      if(value != null){
        var newCreature = Object.assign({}, value);
        if(!value.amount){
          newCreature.amount = 1;
        }
        var existing = this.combatCreatures.find(element => element._id == newCreature._id);
        if(!existing){
          this.combatCreatures.push(newCreature);
          return;
        }
        existing.amount = existing.amount + newCreature.amount;
        // if(!value.amount || value.amount == 1){
        //   this.combatCreatures.push(value.creature);
        // } else {
        //   for(var i = 1; i <= value.amount; i++){
        //     var newCreature = Object.assign({}, value.creature);
        //     newCreature.name = newCreature.name + " #" + i;
        //     this.combatCreatures.push(newCreature);
        //   };
        // };
      };
    });
  }

  startCombat(){
    this.combatSetup = false;
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

  constructor(public dialogRef: MatDialogRef<CombatDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Array<any>){
    this.filteredCreatures = data;
  };

  close() {
    this.dialogRef.close(null);
  };

  search(event){
    if(this.keyword == ""){
      if(this.keyword != this.prevKeyword){
        this.filteredCreatures = [];
        this.data.forEach(element => {
          this.filteredCreatures.push(element);
        });
        this.prevKeyword = this.keyword;
      }
      return
    };

    this.filteredCreatures = [];
    this.data.forEach(element => {
      if(element.creature.name.toLowerCase().indexOf(this.keyword.toLowerCase()) != -1)
        this.filteredCreatures.push(element);
    });
    this.prevKeyword = this.keyword;
  };

  addCreature(creature){
    this.dialogRef.close(creature);
  };
}
