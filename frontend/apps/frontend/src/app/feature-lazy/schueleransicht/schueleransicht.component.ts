import { Component, OnInit } from '@angular/core';
import { PollDto, PollsService } from '../../swagger';

@Component({
  selector: 'app-schueleransicht',
  templateUrl: './schueleransicht.component.html',
  styleUrls: ['./schueleransicht.component.scss']
})
export class SchueleransichtComponent implements OnInit {

  antworten:string[] = ["Antwort1","Antwort2","Antwort3"];
  poll: PollDto|null = null;
  auswahl:string = "";

  constructor(private poolsService: PollsService)
   {

   }

  ngOnInit(): void {
    this.poolsService.pollsGetPollPollCodeGet("abcd").subscribe(x=>{
      this.poll = x,
      this.poll?.pollOptions.forEach(x=>this.antworten.push(x.description));
    });
  }

  sendButtonClicked():void
  {
    this.poolsService.pollsVotePollCodePost("aaaa",)
  }
}
