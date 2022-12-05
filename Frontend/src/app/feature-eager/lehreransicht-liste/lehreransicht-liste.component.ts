import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PollsTmp } from './pollsTmp';


@Component({
  selector: 'app-lehreransicht-liste',
  templateUrl: './lehreransicht-liste.component.html',
  styleUrls: ['./lehreransicht-liste.component.scss']
})
export class LehreransichtListeComponent implements OnInit {
  polls : PollsTmp[] = [
    {pollName : "Umfrage Weihnachtsstunde", endTime: new Date(2022, 15, 12), votes : 12},
    {pollName : "Umfrage Wombats 5BHIF", endTime: new Date(2022, 18, 12), votes : 4},
    {pollName : "Umfrage Wombats 5BHIF", endTime: new Date(2022, 18, 12), votes : 4},
    {pollName : "Umfrage Wombats 5BHIF", endTime: new Date(2022, 18, 12), votes : 4},
    {pollName : "Umfrage Wombats 5BHIF", endTime: new Date(2022, 18, 12), votes : 4},
    {pollName : "Umfrage Wombats 5BHIF", endTime: new Date(2022, 18, 12), votes : 4},
    {pollName : "Umfrage Wombats 5BHIF", endTime: new Date(2022, 18, 12), votes : 4},
    {pollName : "Umfrage Wombats 5BHIF", endTime: new Date(2022, 18, 12), votes : 4},
    {pollName : "Umfrage Wombats 5BHIF", endTime: new Date(2022, 18, 12), votes : 4},
    {pollName : "Umfrage Wombats 5BHIF", endTime: new Date(2022, 18, 12), votes : 4},
    {pollName : "Umfrage Wombats 5BHIF", endTime: new Date(2022, 18, 12), votes : 4},
    {pollName : "Umfrage Wombats 5BHIF", endTime: new Date(2022, 18, 12), votes : 4},
    {pollName : "Umfrage Wombats 5BHIF", endTime: new Date(2022, 18, 12), votes : 4},
    {pollName : "Umfrage Wombats 5BHIF", endTime: new Date(2022, 18, 12), votes : 4},
    {pollName : "Umfrage Wombats 5BHIF", endTime: new Date(2022, 18, 12), votes : 4}
  ];

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  detailsClicked(poll : PollsTmp)
  {
    this.router.navigateByUrl("ergebnisansicht");
  }

  deleteClicked(poll : PollsTmp)
  {
    //Delete
  }

  newPollClicked()
  {
    this.router.navigateByUrl("Lehreransicht");
  }

}
