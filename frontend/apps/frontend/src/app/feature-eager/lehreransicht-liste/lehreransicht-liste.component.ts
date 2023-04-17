import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PollResultDto, PollsService } from '../../polls-backend';
import { Location } from '@angular/common';
import { LiveResultUpdateService } from '../../core/live-result-update.service';

@Component({
  selector: 'app-lehreransicht-liste',
  templateUrl: './lehreransicht-liste.component.html',
  styleUrls: ['./lehreransicht-liste.component.scss']
})
export class LehreransichtListeComponent implements OnInit {
  pollsOfTeacher: PollResultDto[] = [];

  constructor(private router: Router, private pollService: PollsService, private _location: Location, private pollResultUpdates: LiveResultUpdateService) { }

  //Get polls of teacher
  ngOnInit(): void {
    this.pollService.pollsGetPollsFromTeacherGet().subscribe((x: PollResultDto[]) => {
      this.pollsOfTeacher = x;
      for (const poll of this.pollsOfTeacher) {
        this.pollResultUpdates.registerListener2(poll.pollCode, this);
        this.setPollResult(poll);
      }
    });
  }

  showCode(poll: PollResultDto): void {
    this.router.navigateByUrl(`code/${poll.pollCode}`).then(r => console.log('Routed to Ergebnisansicht'));
  }

  backButtonClicked(): void {
    for (const poll of this.pollsOfTeacher) {
      this.pollResultUpdates.unregisterListener(poll.pollCode)
    }
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

  private setPollResult(x: PollResultDto) {
    for (let poll of this.pollsOfTeacher) {
      poll = x;
    }
  }

  static updateList(resultDto: PollResultDto, lehrlistComponent: LehreransichtListeComponent) {
    for (let poll of lehrlistComponent.pollsOfTeacher) {
      poll = resultDto;
    }
  }
}
