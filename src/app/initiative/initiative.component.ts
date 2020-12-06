import { Component, OnInit, Inject } from '@angular/core';
import { CreaturesService } from '@app/creatures/creatures.service';
import { UtilService } from '@app/util/util.service';
import { CreatureAdditionalInfo } from '@app/model/CreatureAdditionalInfo';
import { EncounterXPInfo } from '@app/model/EncounterXPInfo';
import { GroupXPInfo } from '@app/model/GroupXPInfo';

@Component({
  selector: 'app-initiative',
  templateUrl: './initiative.component.html',
  styleUrls: ['./initiative.component.css']
})
export class InitiativeComponent implements OnInit {
  creatures = [];
  filteredCreatures = [];
  playerCharacters = [];
  filteredPlayerCharacters = [];
  keyword = "";
  prevKeyword = "";
  displayPlayers = false;
  combatSetupCreatures = [];
  combatSetupPlayers = [];
  combatCreatures = [];
  combatSetup:boolean = true;
  encounterXPInfo:EncounterXPInfo;
  groupXPInfo:GroupXPInfo;

  constructor(private creaturesService: CreaturesService,
              private utilService: UtilService) { }

  ngOnInit(): void {
    this.creaturesService.getAllCreatures().subscribe(data => {
      for(const[key, value] of Object.entries(data)){
        if(value.creature.challenge_rating == "Player Character"){
          this.playerCharacters.push(value);
          this.filteredPlayerCharacters.push(value);
        } else {
          this.creatures.push(value);
          this.filteredCreatures.push(value);
        }
      };
    });

    this.calculateXpInfo();
  }

  togglePlayersView(){
    this.displayPlayers = !this.displayPlayers;
    this.keyword = "";
    this.prevKeyword = "";

    if(this.displayPlayers){
      this.filteredCreatures = [];
      this.creatures.forEach(element => {
        this.filteredCreatures.push(element);
      });
    } else {
      this.filteredPlayerCharacters = [];
      this.playerCharacters.forEach(element => {
        this.filteredPlayerCharacters.push(element);
      });
    }
  }

  addCreatureCombat(creature){
    creature.creature.challenge_rating_xp = this.utilService.crtoxp(creature.creature.challenge_rating);

    var existing = this.combatSetupCreatures.find(element => element._id == creature._id);
    if(!existing){
      if(creature.additionalInfo == undefined){
        creature.additionalInfo = new CreatureAdditionalInfo();
      }
      creature.additionalInfo.amount = 1;
      this.combatSetupCreatures.push(creature);
      this.calculateXpInfo();
      return;
    }
    ++existing.additionalInfo.amount;
    this.calculateXpInfo();
  }

  addPlayerCombat(creature){
    var existing = this.combatSetupPlayers.find(element => element._id == creature._id);
    if(!existing){
      this.combatSetupPlayers.push(creature);
    }
    this.calculateGroupXpInfo();
    this.calculateXpInfo();
  }

  search(event){
    if(this.keyword == ""){
      if(this.keyword != this.prevKeyword){
        if(this.displayPlayers){
          this.filteredPlayerCharacters = [];
          this.playerCharacters.forEach(element => {
            this.filteredPlayerCharacters.push(element);
          });
        } else {
          this.filteredCreatures = [];
          this.creatures.forEach(element => {
            this.filteredCreatures.push(element);
          });
        }
        this.prevKeyword = this.keyword;
      }
      return
    };

    if(this.displayPlayers){
      this.filteredPlayerCharacters = [];
      this.playerCharacters.forEach(element => {
        if(element.creature.name.toLowerCase().indexOf(this.keyword.toLowerCase()) != -1)
          this.filteredPlayerCharacters.push(element);
      });
    } else {
      this.filteredCreatures = [];
      this.creatures.forEach(element => {
        if(element.creature.name.toLowerCase().indexOf(this.keyword.toLowerCase()) != -1)
          this.filteredCreatures.push(element);
      });
    }

    this.prevKeyword = this.keyword;
  }

  startCombat(){
    var newCreature;
    var newCreatureInfo;
    var newCreatureAdditionalInfo;

    this.combatSetupCreatures.forEach(element => {
      if(element.additionalInfo.amount == 1){
        this.setupCreature(element);
        this.combatCreatures.push(element);
      } else {
        for(var i = 1; i <= element.additionalInfo.amount; i++){
          newCreature = Object.assign({}, element);
          newCreatureInfo = Object.assign({}, element.creature);
          newCreatureAdditionalInfo = Object.assign({}, element.additionalInfo);
          newCreature.creature = newCreatureInfo;
          newCreature.additionalInfo = newCreatureAdditionalInfo;
          this.setupCreature(newCreature);
          newCreatureInfo.name = element.creature.name + " #" + i;

          this.combatCreatures.push(newCreature);
        };
      }
    });

    this.combatSetupPlayers.forEach(element => {
      newCreature = Object.assign({}, element);
      newCreatureInfo = Object.assign(newCreature.creature, element.creature);
      this.setupCreature(newCreature);
      this.combatCreatures.push(newCreature);
    });

    this.combatSetup = false;
  }

  setupCreature(creature){
    if(!creature.additionalInfo){
      creature.additionalInfo = new CreatureAdditionalInfo();
    }
    creature.additionalInfo.initiative = this.utilService.calculateInitiative(creature);
    creature.additionalInfo.current_hit_points = creature.creature.hit_points;
    creature.additionalInfo.class = "";
  }

  calculateXpInfo(){
    if(!this.encounterXPInfo){
      this.encounterXPInfo = new EncounterXPInfo();
    }

    this.encounterXPInfo.totalXp = this.calculateTotalXp();
    this.encounterXPInfo.totalXpPerPlayer = this.calculateTotalXpPerPlayer();
    this.encounterXPInfo.adjustedXp = this.calculateAdjustedXp();
    this.encounterXPInfo.encounterDifficulty = this.calculateEncounterDifficulty();
  }

  calculateGroupXpInfo(){
    var easy = 0;
    var medium = 0;
    var hard = 0;
    var deadly = 0;
    if(!this.groupXPInfo){
      this.groupXPInfo = new GroupXPInfo();
    } else {
      this.groupXPInfo.reset();
    }

    this.combatSetupPlayers.forEach(element => {
      console.log(element.creature.name)
      var thresholds = this.utilService.levelToXpThreshold(element.creature.level);
      console.log(thresholds);
      easy += thresholds.Easy;
      medium += thresholds.Medium;
      hard += thresholds.Hard;
      deadly += thresholds.Deadly;
    });

    this.groupXPInfo.easy = easy;
    this.groupXPInfo.medium = medium;
    this.groupXPInfo.hard = hard;
    this.groupXPInfo.deadly = deadly;
  }

  calculateTotalXp(){
    var totalXp = 0;
    this.combatSetupCreatures.forEach(element => {
      totalXp += this.utilService.crtoxp(element.creature.challenge_rating) * element.additionalInfo.amount;
    });
    return totalXp;
  }

  calculateTotalXpPerPlayer(){
    return Math.floor(this.calculateTotalXp() / this.combatSetupPlayers.length);
  }

  calculateAdjustedXp(){
    if(this.combatSetupCreatures.length > 0){
      var amountOfCreatures = 0;
      this.combatSetupCreatures.forEach(element => {
        amountOfCreatures += element.additionalInfo.amount;
      });
      return this.calculateTotalXp() * this.utilService.encounterMultiplier(amountOfCreatures);
    }
    return null;
  }

  calculateEncounterDifficulty(){
    var adjustedXp = this.calculateAdjustedXp();
    var easy = 0;
    var medium = 0;
    var hard = 0;
    var deadly = 0;

    this.combatSetupPlayers.forEach(element => {
      var thresholds = this.utilService.levelToXpThreshold(element.creature.level);
      easy += thresholds.Easy;
      medium += thresholds.Medium;
      hard += thresholds.Hard;
      deadly += thresholds.Deadly;
    });

    if(adjustedXp >= deadly){
      return "Deadly";
    } else if(adjustedXp >= hard){
      return "Hard";
    } else if(adjustedXp >= medium){
      return "Medium";
    } else {
      return "Easy"
    }
  }

  removePlayer(player){
    let index = this.utilService.getIndex(this.combatSetupPlayers, player);

    this.combatSetupPlayers.splice(index, 1);
    this.calculateXpInfo();
    this.calculateGroupXpInfo();
  }

  removeCreatureSetup(creature){
    let index = this.utilService.getIndex(this.combatSetupCreatures, creature);

    if(this.combatSetupCreatures[index].additionalInfo.amount !== undefined && this.combatSetupCreatures[index].additionalInfo.amount > 1){
      this.combatSetupCreatures[index].additionalInfo.amount--;
    } else {
      this.combatSetupCreatures.splice(index, 1);
    }
    this.calculateXpInfo();
  }
}
