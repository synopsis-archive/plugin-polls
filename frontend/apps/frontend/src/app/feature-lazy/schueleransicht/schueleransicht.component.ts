import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {PollDto, PollOptionDto, PollsService} from "../../polls-backend";

@Component({
  selector: 'app-schueleransicht',
  templateUrl: './schueleransicht.component.html',
  styleUrls: ['./schueleransicht.component.scss']
})
export class SchueleransichtComponent implements OnInit {
  poll?: PollDto = undefined;
  possibleAnswers?: PollOptionDto[] = undefined;
  codeInput: string = '';
  code: string = "";
  check: boolean = false;
  pollQuestion: string = "";
  isMultipleChoice: boolean = true;
  chooseAnswerText: string = "";

  constructor(private activatedRoute: ActivatedRoute, private poolsService: PollsService,
              private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(x=> this.codeInput = x.get('id') ?? 'UNKNOWN');
    this.code = this.codeInput.toString();
    this.poolsService.pollsGetPollPollCodeGet(this.code).subscribe(x=>{
      this.poll = x;

      this.possibleAnswers = this.poll.pollOptions;
      this.pollQuestion = this.poll.pollQuestion;
      this.isMultipleChoice = this.poll.isMultipleChoice;
    });
    if(this.isMultipleChoice)
    {
      this.chooseAnswerText = "Wählen sie bitte eine (oder mehrere) Antwort(en):";

    }else{
      this.chooseAnswerText = "Wählen sie bitte nur eine Antwort aus";
    }
  }

  resultButtonClicked(): void {
    this.router.navigateByUrl(`/Ergebnisansicht/${this.code}`).then(r => console.log('Routed to Ergebnisansicht'));
  }

  sendVoteButtonClicked(): void {
    this.poolsService.pollsVotePollCodePost(this.code);
  }
}
