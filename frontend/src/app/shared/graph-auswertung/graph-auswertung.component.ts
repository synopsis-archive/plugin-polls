import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph-auswertung',
  templateUrl: './graph-auswertung.component.html',
  styleUrls: ['./graph-auswertung.component.scss']
})
export class GraphAuswertungComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('GraphAuswertungComponent.ngOnInit()');
  }

}
