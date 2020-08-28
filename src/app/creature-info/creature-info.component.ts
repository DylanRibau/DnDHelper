import { Component, OnInit, Input } from '@angular/core';
import { UtilService } from '@app/util/util.service';

@Component({
  selector: 'creature-info',
  templateUrl: './creature-info.component.html',
  styleUrls: ['./creature-info.component.css']
})
export class CreatureInfoComponent implements OnInit {
  @Input() creature;

  constructor(public utilService: UtilService) { }

  ngOnInit(): void {
    
  }

}
