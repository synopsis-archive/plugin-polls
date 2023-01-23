import { Component } from '@angular/core';
import { PollOptionReplayDto, PollReplayDto, PollDto, PollsService } from "../../polls-backend";
import {Location} from '@angular/common';


@Component({
  selector: 'app-lehreransicht',
  templateUrl: './lehreransicht.component.html',
  styleUrls: ['./lehreransicht.component.scss']
})

export class LehreransichtComponent {
  title: string = '';
  question: string = '';
  options: string[] = ["", "", ""];
  dateFrom = '';
  dateTo = '';
  timeFrom = '';
  timeTo = '';
  multipleChoice = false;

  errorDateHidden = true;

  constructor(private backendService: PollsService,private _location: Location) { }

  createPoll(): void {
    if (!this.checkAttributes())
      return;

    const options: PollOptionReplayDto[] = this.options.map(x => { return { description: x }; });
    // 2023-01-23T07:39:24.126Z
    // 2023-01-23 09:42
    const startTime = `${this.dateFrom}T${this.timeFrom}:00.000Z`;
    const endTime = `${this.dateTo}T${this.timeTo}:00.000Z`;
    const pollReplayDto: PollReplayDto = {
      pollName: this.title,
      pollQuestion: this.question,
      startTime: startTime,
      endTime: endTime,
      isMultipleChoice: this.multipleChoice,
      pollOptions: options
    }
    console.log(startTime);
    console.log(endTime);
    // 2023-01-23T08:44:00.000Z
    this.backendService.pollsPost(pollReplayDto).subscribe((x: PollDto) => {
      //TODO: Do something with this code
      console.log(x.pollCode);
      console.log(JSON.stringify(x));
    });
  }

  backButtonClicked():void{
    this._location.back();

  }

  private checkAttributes() {
    if(this.CheckDate() && this.CheckTitle() && this.CheckOptionsAmount() && this.CheckOptionsRepeat())
    {
      return true;
    }
    alert("Denied");
    return false;
  }

  CheckDate()
  {
    if(new Date(this.dateFrom) > new Date(this.dateTo))
    {
      this.errorDateHidden = false;
      return false;
    }
    this.errorDateHidden = true;
    return true;
  }

  CheckTitle()
  {
    if(this.title.trim().length <= 0 || this.question.trim().length <= 0) {
      //alert("Ein Titel bzw. eine Frage wird benötigt.");
      return false;
    }
    return true;
  }

  CheckOptionsAmount()
  {
    if(this.options.length <= 1 || this.options.every(x => x.trim().length <= 0)) {
      //alert("Es müssen mindestens zwei Antwortoption angegeben werden.");
      return false;
    }
    return true;
  }

  CheckOptionsRepeat()
  {
    if(!this.options.every((e, i, a) => a.indexOf(e) === i))
    {
      //DO Error
      return false;
    }
    return true;
  }
}
