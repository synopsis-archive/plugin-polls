import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ergebnis',
  templateUrl: './ergebnis.component.html',
  styleUrls: ['./ergebnis.component.scss']
})
export class ErgebnisComponent implements OnInit {

  umfragenTitel = "Umfrage Wombats";
  umfragenFrage = "Was essen Wombats?";
  umfragenErsteller = "Florian Nadler";
  umfragenDatum = "21.11.2022";

  constructor() { }

  ngOnInit(): void {
  }

}
