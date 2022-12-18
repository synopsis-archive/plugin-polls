import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  check:boolean = false;

  constructor(private poolsService: PollsService,private router:Router)
   {

   }

  ngOnInit(): void {
    this.poolsService.pollsGetPollPollCodeGet("abcd").subscribe(x=>{
      this.poll = x,
      this.poll?.pollOptions.forEach(x=>this.antworten.push(x.description));
    });
  }

  ergebnissButtonClicked():void
  {
    this.router.navigate(['/Ergebnisansicht']);
  }

  sendButtonClicked():void
  {
    this.check = true;
    //this.poolsService.pollsVotePollCodePost("aaaa",)
  }
}
