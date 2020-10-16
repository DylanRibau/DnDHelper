import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from '@app/model/DialogData';

@Component({
  selector: 'app-creatures-dialog',
  templateUrl: './creatures-dialog.component.html',
  styleUrls: ['./creatures-dialog.component.css']
})
export class CreaturesDialogComponent {
  keyword = "";
  prevKeyword = "";
  filteredCreatures = [];

  constructor(public dialogRef: MatDialogRef<CreaturesDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData){
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
