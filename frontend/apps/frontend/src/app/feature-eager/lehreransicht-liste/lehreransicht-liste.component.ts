import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PollDto, PollsService } from '../../polls-backend';
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

  pollsNew : PollDto[] = [];

  constructor(private router : Router, private poolsService: PollsService) { }

  ngOnInit(): void {
    this.poolsService.pollsGetPollsFromTeacherGet().subscribe(x=>{
      this.pollsNew = x;
    });
  }
  

  detailsClicked(poll : PollsTmp)
  {
    this.router.navigateByUrl("Ergebnisansicht");
    //this.router.navigateByUrl("Ergebnisansicht/"+poll.pollCode);
  }

  deleteClicked(poll : PollsTmp)
  {
    //this.pollsService.deletePoll(poll.pollCode);
  }

  newPollClicked()
  {
    this.router.navigateByUrl("Lehreransicht");
    //this.router.navigateByUrl("Lehreransicht"+poll.pollCode);
  }

}
