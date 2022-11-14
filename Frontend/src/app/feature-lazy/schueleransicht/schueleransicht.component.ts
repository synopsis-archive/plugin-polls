import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schueleransicht',
  templateUrl: './schueleransicht.component.html',
  styleUrls: ['./schueleransicht.component.scss']
})
export class SchueleransichtComponent implements OnInit {

  antworten:string[] = ["Antwort1","Antwort2","Antwort3"];

  constructor() { }

  ngOnInit(): void {
    
  }

}
