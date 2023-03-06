import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import {PollDto, PollOptionDto, PollsService,VoteReplayDto} from "../../polls-backend";
import { VotesService } from '../../shared/votesService';

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
  check: boolean = true;
  checkHidden:boolean = true;
  pollQuestion: string = "";
  isMultipleChoice: boolean = true;
  chooseAnswerText: string = "";
  listOfSelectedItems:string[] = [];
  listOfOptionId:number[] = [];
  constructor(private activatedRoute: ActivatedRoute, private poolsService: PollsService,
              private router: Router,private _location: Location, private votesService: VotesService) {}

  ngOnInit(): void {
    this.listOfOptionId = [];
    this.listOfSelectedItems = [];
    //Get Code from URL, cast it to string
    this.activatedRoute.paramMap.subscribe(x=> this.codeInput = x.get('id') ?? 'UNKNOWN');
    this.code = this.codeInput.toString();
    //Get poll that corresponds to code, set possible answers, question and multiple choice bool from it
    this.poolsService.pollsGetPollPollCodeGet(this.code).subscribe(x=>{
      this.poll = x;

      this.possibleAnswers = this.poll.pollOptions;
      this.pollQuestion = this.poll.pollQuestion;
      this.isMultipleChoice = this.poll.isMultipleChoice;

      //Depending on if the poll is multiple choice, display different text.
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

  //Navigate to results page of the poll with the code
  resultButtonClicked(): void {
    this.router.navigateByUrl(`/Ergebnisansicht/${this.code}`).then(r => console.log('Routed to Ergebnisansicht'));
    this.checkHidden=false;
  }

  //If the poll isn't multiple chocie, empty the list of selected items to ensure only one is in it at any time. Then push the clicked item into the list.
  clicked(item:string){
    if(!this.isMultipleChoice)
    {
      this.listOfSelectedItems = [];
    }
    this.listOfSelectedItems.push(item);
    console.log(item + " wurde ausgewählt ");
  }

  radioClicked(item:string){
    if(!this.isMultipleChoice)
    {
      this.listOfSelectedItems = [];
    }
    this.listOfSelectedItems.push(item);
    console.log(item + " wurde ausgewählt ");

  }


  //Iterates over the possible answers and selected items, if it finds any matches it pushes the id into a list
  sendVoteButtonClicked(): void {
    this.check = false;
    this.possibleAnswers?.forEach(dto=>{
      this.listOfSelectedItems.forEach(Element =>{
          if(dto.description === Element){
              this.listOfOptionId.push(dto.pollOptionId!);
          }
      });
      console.log(this.listOfOptionId);
    });
    //Makes a reply DTO and adds all optionIds
   const optionReplyDto:VoteReplayDto[] = this.listOfOptionId.map(x =>{
      return {
        optionId : x
      }
    });

    //Posts the code and option reply DTO to the server, then navigates to results.
    this.poolsService.pollsVotePollCodePost(this.code,optionReplyDto).subscribe();
    this.checkHidden=false;
    //this.resultButtonClicked();
    this.votesService.addVote();
    console.log("Votes:" + this.votesService.getVote());
  }
}
