import { Component, OnInit } from '@angular/core';
import { PollOptionReplayDto, PollReplayDto, PollsService } from '../../polls-backend';

@Component({
  selector: 'app-lehreransicht',
  templateUrl: './lehreransicht.component.html',
  styleUrls: ['./lehreransicht.component.scss']
})

export class LehreransichtComponent {
  title = '';
  question = '';
  options: string[] = [];
  dateFrom = '';
  dateTo = '';
  timeFrom = '';
  timeTo = '';
  multipleChoice = false;

  constructor(private pollsService: PollsService) { }

  // ngOnInit(): void {
  // }

  createPoll(): void {
    console.log(`${this.title} ${this.question} ${this.options[0]}${this.options[1]}${this.options[2]} ${this.dateFrom} ${this.timeFrom} ${this.dateTo} ${this.timeTo} ${this.multipleChoice}`);
    const pollOptions: PollOptionReplayDto[] = []
    this.options.forEach(x => {
      const option: PollOptionReplayDto = {
        description: x
      };
      pollOptions.push(option);
    });

    const startTime = this.dateFrom + "T" + this.timeFrom + ":00.000Z";
    const endTime = this.dateTo + "T" + this.timeTo + ":00.000Z";

    console.log(startTime);
    console.log(endTime);

    const pollDto: PollReplayDto = {
      pollName: this.title,
      pollQuestion: this.question,
      pollOptions: pollOptions,
      startTime: this.dateFrom + " " + this.timeFrom,
      endTime: this.dateTo + " " + this.timeTo,
      isMultipleChoice: this.multipleChoice,
      // createdBy: '080912bd-fc81-4f1a-b47f-e7ab8d2add2e'
    }
    this.pollsService.pollsPost(pollDto).subscribe(x => {
      console.log(JSON.stringify(x));
    });
  }
}