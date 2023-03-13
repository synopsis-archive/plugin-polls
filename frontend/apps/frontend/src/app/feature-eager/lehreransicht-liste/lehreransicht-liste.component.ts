import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PollResultDto, PollsService } from '../../polls-backend';
import { Location } from '@angular/common';
import { VotesService } from "../../shared/votesService";

@Component({
  selector: 'app-lehreransicht-liste',
  templateUrl: './lehreransicht-liste.component.html',
  styleUrls: ['./lehreransicht-liste.component.scss']
})
export class LehreransichtListeComponent implements OnInit {
  pollsOfTeacher: PollResultDto[] = [];
  totalVotes = 0;

  constructor(private router: Router, private pollService: PollsService, private _location: Location, private votesService: VotesService) { }

  //Get polls of teacher
  ngOnInit(): void {
    this.pollService.pollsGetPollsFromTeacherGet().subscribe((x: PollResultDto[]) => {
      this.pollsOfTeacher = x;
    });
    this.totalVotes = this.votesService.getVote();
  }

  showCode(poll: PollResultDto):void{
    this.router.navigateByUrl(`code/${poll.pollCode}`).then(r => console.log('Routed to Ergebnisansicht'));

  }

  backButtonClicked(): void {
    this._location.back();
  }

  //Go to results of poll
  detailsClicked(poll: PollResultDto): void {
    this.router.navigateByUrl(`Ergebnisansicht/${poll.pollCode}`).then(r => console.log('Routed to Ergebnisansicht'));
  }

  //Delete poll
  deleteClicked(poll: PollResultDto): void {
    if (confirm("You really want to delete the poll?")) {
      console.log("You pressed OK!");
      this.pollService.pollsDeletePollPollCodeDelete(poll.pollCode).subscribe(_ => {
        this.pollService.pollsGetPollsFromTeacherGet().subscribe((x: PollResultDto[]) => {
          this.pollsOfTeacher = x;
        });
      });

      this.pollService.pollsGetPollsFromTeacherGet().subscribe((x: PollResultDto[]) => {
        this.pollsOfTeacher = x;
      });
    } else {
      console.log("You pressed Cancel!");
    }
  }

  //Make new poll
  newPollClicked(): void {
    this.router.navigateByUrl("Lehreransicht").then(_ => { });
  }
}
