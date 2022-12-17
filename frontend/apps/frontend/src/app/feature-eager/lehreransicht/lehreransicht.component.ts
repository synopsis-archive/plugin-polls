import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lehreransicht',
  templateUrl: './lehreransicht.component.html',
  styleUrls: ['./lehreransicht.component.scss']
})

export class LehreransichtComponent implements OnInit {
  title = '';
  question = '';
  options: string[] = [];
  dateFrom = '';
  dateTo = '';
  timeFrom = '';
  timeTo = '';
  multipleChoice = false;

  constructor() { }

  ngOnInit(): void {
    console.log('LehreransichtComponent.ngOnInit()');
  }

  createPoll(): void {
    console.log(`${this.title} ${this.question} ${this.options[0]}${this.options[1]}${this.options[2]} ${this.dateFrom} ${this.timeFrom} ${this.dateTo} ${this.timeTo} ${this.multipleChoice}`);

    // const pollDto: PollReplayDto = {

    // }
    // this.pollsService.pollsPost()
  }
}
