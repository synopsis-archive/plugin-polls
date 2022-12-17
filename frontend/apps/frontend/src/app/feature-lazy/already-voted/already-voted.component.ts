import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-already-voted',
  templateUrl: './already-voted.component.html',
  styleUrls: ['./already-voted.component.scss']
})
export class AlreadyVotedComponent implements OnInit {

  umfragenFrage = "Was essen Wombats?";

  constructor() { }

  ngOnInit(): void {
  }

}
