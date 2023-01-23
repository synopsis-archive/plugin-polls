import { Component } from '@angular/core';
import {PollOptionReplayDto, PollReplayDto, PollDto, PollsService} from "../../polls-backend";

@Component({
  selector: 'app-lehreransicht',
  templateUrl: './lehreransicht.component.html',
  styleUrls: ['./lehreransicht.component.scss']
})

export class LehreransichtComponent {
  title: string = '';
  question: string = '';
  options: string[] = ["", "",""];
  dateFrom = '';
  dateTo = '';
  timeFrom = '';
  timeTo = '';
  multipleChoice = false;

  constructor(private backendService: PollsService) { }

  createPoll(): void {
    if(!this.checkAttributes())
      return;

    const options: PollOptionReplayDto[] = this.options.map(x => { return { description: x }; });

    const pollReplayDto: PollReplayDto = {
      pollName: this.title,
      pollQuestion: this.question,
      startTime: new Date(this.dateFrom).toISOString(),
      endTime: new Date(this.dateTo).toISOString(),
      isMultipleChoice: this.multipleChoice,
      pollOptions: options
    }

    this.backendService.pollsPost(pollReplayDto).subscribe((x: PollDto) => {
      //TODO: Do something with this code
      console.log(x.pollCode);
      console.log(JSON.stringify(x));
    });
  }

  private checkAttributes() {
    if(this.title.trim().length <= 0 || this.question.trim().length <= 0) {
      alert("Ein Titel bzw. eine Frage wird benötigt.");
      return false;
    }

    if(this.options.length <= 1 || this.options.every(x => x.trim().length <= 0)) {
      alert("Es müssen mindestens zwei Antwortoption angegeben werden.");
      return false;
    }

    return true;
  }
}
