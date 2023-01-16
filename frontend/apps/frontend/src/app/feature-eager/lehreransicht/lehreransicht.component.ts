import { Component, OnInit } from '@angular/core';
import { PollOptionReplayDto, PollReplayDto, PollsService } from "../../polls-backend";

@Component({
  selector: 'app-lehreransicht',
  templateUrl: './lehreransicht.component.html',
  styleUrls: ['./lehreransicht.component.scss']
})

export class LehreransichtComponent {
  title = '';
  question = '';
  options: string[] = ["", "","", "","", "","", "","", "","", "","", "","", "","", "","", "","", "",];
  dateFrom = '';
  dateTo = '';
  timeFrom = '';
  timeTo = '';
  multipleChoice = false;

  constructor(private backendService: PollsService) { }

  // ngOnInit(): void {
  // }

  createPoll(): void {
    const options: PollOptionReplayDto[] = this.options.map(x => { return { description: x }; });

    const pollReplayDto: PollReplayDto = {
      pollName: this.title,
      pollQuestion: this.question,
      startTime: new Date(this.dateFrom).toISOString(),
      endTime: new Date(this.dateTo).toISOString(),
      isMultipleChoice: this.multipleChoice,
      pollOptions: options
    }

    this.backendService.pollsPost(pollReplayDto).subscribe(x => {
      console.log(JSON.stringify(x));
    });
  }
}