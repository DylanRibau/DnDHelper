import { Component, OnInit, Input } from '@angular/core';
import { UtilService } from '@app/util/util.service';
import { CreaturesService } from '@app/creatures/creatures.service';
import { CreatureAdditionalInfo } from '@app/model/CreatureAdditionalInfo';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CreaturesDialogComponent } from '@app/creatures-dialog/creatures-dialog.component';
import { DialogData } from '@app/model/DialogData';
import { AuthUtil } from '@app/util/auth.util';

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.css']
})
export class CombatComponent implements OnInit {
  @Input() creatures;
  rounds:number = 0;
  turn:number = 0;
  currentCreature = null;
  creatureExpanded = null;

  timer:string = "00:00";
  time:number = 0;
  interval;

  constructor(private creaturesService: CreaturesService,
              private dialog: MatDialog,
              private utilService: UtilService,
              private authUtil: AuthUtil) { }

  ngOnInit(): void {
    this.sortInCombat();
  }

  initializeCombat(){
    this.rounds = 1;
    this.turn = 1;
    this.currentCreature = this.creatures[0];
    this.currentCreature.additionalInfo.class = "current-creature";
    this.startTimer();
  }

  nextTurn(){
    this.currentCreature.class = "";
    var index = this.creatures.indexOf(this.currentCreature);
    if(++index < this.creatures.length){
      this.currentCreature = this.creatures[index];
      this.turn++;
    } else {
      this.currentCreature = this.creatures[0];
      this.turn = 1;
      this.rounds++;
    }
    this.currentCreature.class = "current-creature";
    this.resetTimer();
  }

  displayCreatureInfo(creature){
    this.creatureExpanded = creature;
  }

  deleteCreature(creature){
    let index = this.creatures.map(function(item){
      return item.creature;
    }).indexOf(creature.creature);

    this.creatures.splice(index, 1);
  }

  openDialogInCombat(){
    let allCreatures = [];
    this.creaturesService.getAllCreatures(this.authUtil.getUserId()).subscribe(data => {
      for(const[key, value] of Object.entries(data)){
        allCreatures.push(value);
      };
    });

    let passingData = { creatures: allCreatures, combat: true};
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = passingData;
    dialogConfig.width = '500px';
    let dialogRef = this.dialog.open(CreaturesDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(value => {
      if(value != null){
        let newCreature = Object.assign({}, value);
        newCreature.additionalInfo = new CreatureAdditionalInfo();
        this.setupCreature(newCreature);
        let existing = this.creatures.filter(element => element._id == newCreature._id);
        if(existing.length > 0){
          let newCreatureInfo = Object.assign({}, newCreature.creature);
          newCreatureInfo.name = newCreatureInfo.name + " #" + ++existing.length ;
          newCreature.creature = newCreatureInfo;
        }
        this.creatures.push(newCreature);
      };

      this.sortInCombat();
    });
  }

  sortInCombat(){
    this.creatures.sort((a, b) => {
      if(a.additionalInfo.initiative == b.additionalInfo.initiative){
        if(a.creature.dexterity == b.creature.dexterity){
          return a.creature.name.localeCompare(b.creature.name);
        }
        return b.creature.dexterity - a.creature.dexterity;
      }
      return b.additionalInfo.initiative - a.additionalInfo.initiative;
    });
  }

  setupCreature(creature){
    creature.additionalInfo.initiative = this.utilService.calculateInitiative(creature);
    creature.additionalInfo.current_hit_points = creature.creature.hit_points;
    creature.additionalInfo.class = "";
  }

  startTimer(){
    this.interval = setInterval(() => {
      this.time++;
      this.setupTimer();
    }, 1000);
  }

  setupTimer(){
    let minutes = Math.floor(this.time / 60);
    let seconds = this.time - minutes * 60;
    this.timer = this.utilService.strPadLeft(minutes, '0', 2) + ':' + this.utilService.strPadLeft(seconds, '0', 2);
  }

  resetTimer(){
    clearInterval(this.interval);
    this.time = 0;
    this.timer = "00:00";
    this.startTimer();
  }
}
