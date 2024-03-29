import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PollResultDto, PollsService} from '../../polls-backend';
import {Location} from '@angular/common';


@Component({
  selector: 'app-lehreransicht-liste',
  templateUrl: './lehreransicht-liste.component.html',
  styleUrls: ['./lehreransicht-liste.component.scss']
})
export class LehreransichtListeComponent implements OnInit {
  pollsOfTeacher: PollResultDto[] = [];

  constructor(private router: Router, private pollService: PollsService,private _location: Location) { }

  ngOnInit(): void {
    this.pollService.pollsGetPollsFromTeacherGet().subscribe((x: PollResultDto[]) => {
      this.pollsOfTeacher = x;
    });
  }

  backButtonClicked():void{
    this._location.back();
  }

  detailsClicked(poll: PollResultDto): void {
    this.router.navigateByUrl(`Ergebnisansicht/${poll.pollCode}`).then(_ => {});
  }

  deleteClicked(poll: PollResultDto): void {
    this.pollService.pollsDeletePollPollCodeDelete(poll.pollCode).subscribe(_ => {
      this.pollService.pollsGetPollsFromTeacherGet().subscribe((x: PollResultDto[]) => {
        this.pollsOfTeacher = x;
      });
    });
  }

  newPollClicked(): void {
    this.router.navigateByUrl("Lehreransicht").then(_ => {});
  }
}
