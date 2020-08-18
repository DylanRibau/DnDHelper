import { Component, OnInit } from '@angular/core';
import { CreaturesService } from './creatures.service';

@Component({
  selector: 'app-creatures',
  templateUrl: './creatures.component.html',
  styleUrls: ['./creatures.component.css']
})
export class CreaturesComponent implements OnInit {
  allCreatures = [];

  constructor(private creaturesService: CreaturesService) { }

  ngOnInit(): void {
    this.creaturesService.getAllCreatures().subscribe(data => {
      for(const[key, value] of Object.entries(data)){
        this.allCreatures.push(value.creature);
      };
    });
  };
}
