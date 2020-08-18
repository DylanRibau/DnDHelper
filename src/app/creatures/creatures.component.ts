import { Component, OnInit } from '@angular/core';
import { CreaturesService } from './creatures.service';

@Component({
  selector: 'app-creatures',
  templateUrl: './creatures.component.html',
  styleUrls: ['./creatures.component.css']
})
export class CreaturesComponent implements OnInit {
  responseJson = {};

  constructor(private creaturesService: CreaturesService) { }

  ngOnInit(): void {
    this.creaturesService.getAllCreatures().subscribe(data => {
      this.responseJson = JSON.stringify(data);
    });
  };

}
