import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PollDto, PollsService } from '../../polls-backend';

@Component({
  selector: 'app-schueleransicht',
  templateUrl: './schueleransicht.component.html',
  styleUrls: ['./schueleransicht.component.scss']
})
export class SchueleransichtComponent implements OnInit {

  antworten:string[] = ["Antwort1","Antwort2","Antwort3"];
  codeInput:number = 0;
  code:string = "";
  antwortMoeglichkeiten:string[] = [];
  poll: PollDto|null = null;
  auswahl:string = "";
  check:boolean = false;
  frage:string = "";
  mehrAntwortMoeglichkeiten:boolean = false;
  mehrAntwortMoeglichk:string = "";

  constructor(private activatedRoute:ActivatedRoute ,private poolsService: PollsService,private router:Router)
   {

   }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(x=>this.codeInput = +(x.get('id')??'0'));
    this.code = this.codeInput.toString();
    this.poolsService.pollsGetPollPollCodeGet(this.code).subscribe(x=>{
      this.poll = x,
      this.poll?.pollOptions.forEach(x=>this.antwortMoeglichkeiten.push(x.description));
      this.frage = this.poll.pollQuestion;
      this.mehrAntwortMoeglichkeiten = this.poll.isMultipleChoice;
    });
    if(this.mehrAntwortMoeglichkeiten)
    {
      this.mehrAntwortMoeglichk = "Wählen sie bitte eine (oder mehrere) Antwort(en):";
    }else{
      this.mehrAntwortMoeglichk = "Wählen sie bitte nur eine Antwort aus";
    }
  }

  ergebnissButtonClicked():void
  {
    this.router.navigate(['/Ergebnisansicht']);
  }

  sendButtonClicked():void
  {
    this.check = true;
    this.poolsService.pollsVotePollCodePost(this.code);
  }
}
