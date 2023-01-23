import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import {PollDto, PollOptionDto, PollsService,VoteReplayDto} from "../../polls-backend";

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
  listOfSelectedItems:string[] = [];
  listOfOptionId:number[] = [];
  constructor(private activatedRoute: ActivatedRoute, private poolsService: PollsService,
              private router: Router,private _location: Location) {}

  ngOnInit(): void {
    this.listOfOptionId = [];
    this.listOfSelectedItems = [];
    this.activatedRoute.paramMap.subscribe(x=> this.codeInput = x.get('id') ?? 'UNKNOWN');
    this.code = this.codeInput.toString();
    this.poolsService.pollsGetPollPollCodeGet(this.code).subscribe(x=>{
      this.poll = x;

      this.possibleAnswers = this.poll.pollOptions;
      this.pollQuestion = this.poll.pollQuestion;
      this.isMultipleChoice = this.poll.isMultipleChoice;

      if(this.isMultipleChoice)
    {
      this.chooseAnswerText = "Wählen sie bitte eine (oder mehrere) Antwort(en):";
    }else{
      this.chooseAnswerText = "Wählen sie bitte nur eine Antwort aus";
    }
    });
  }

  returnButtonClicked():void{
    this._location.back();
  }

  resultButtonClicked(): void {
    this.router.navigateByUrl(`/Ergebnisansicht/${this.code}`).then(r => console.log('Routed to Ergebnisansicht'));
  }

  clicked(item:string){
    if(!this.isMultipleChoice)
    {
      this.listOfSelectedItems = [];
    }
    this.listOfSelectedItems.push(item);
    console.log(item + " wurde ausgewählt ");
  }

  sendVoteButtonClicked(): void {
    this.possibleAnswers?.forEach(dto=>{
      this.listOfSelectedItems.forEach(Element =>{
          if(dto.description === Element){
              this.listOfOptionId.push(dto.pollOptionId!);
          }
      });
      console.log(this.listOfOptionId);
    });
   const optionReplyDto:VoteReplayDto[] = this.listOfOptionId.map(x =>{
      return {
        optionId : x
      }
    });
   
    this.poolsService.pollsVotePollCodePost(this.code,optionReplyDto).subscribe();
  }


}
