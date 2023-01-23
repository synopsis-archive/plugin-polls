import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PollDto, PollResultDto, PollsService } from '../../polls-backend';

@Component({
  selector: 'app-lehreransicht-liste',
  templateUrl: './lehreransicht-liste.component.html',
  styleUrls: ['./lehreransicht-liste.component.scss']
})
export class LehreransichtListeComponent implements OnInit {
  pollsNew : PollDto[] = [];

  constructor(private router : Router, private poolsService: PollsService) { }

  ngOnInit(): void {
    this.poolsService.pollsGetPollsFromTeacherGet().subscribe(x=>{
      this.pollsNew = x;
    });
  }
  
  detailsClicked(poll : PollDto)
  {
    this.router.navigateByUrl("Ergebnisansicht");
    //this.router.navigateByUrl("Ergebnisansicht/"+poll.pollCode);
  }

  deleteClicked(poll : PollDto)
  {
    //this.pollsService.deletePoll(poll.pollCode);
  }

  newPollClicked()
  {
    this.router.navigateByUrl("Lehreransicht");
    //this.router.navigateByUrl("Lehreransicht"+poll.pollCode);
  }

  getPollAnswersNr(pollCode : string)
  {
    let res : PollResultDto;

    this.poolsService.pollsGetPollResultPollCodeGet(pollCode).subscribe(x=>{
      res = x;
      return res.receivedAnswers;
    });
  }

}
