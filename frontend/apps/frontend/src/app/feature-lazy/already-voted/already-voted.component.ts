import { Component, OnInit } from '@angular/core';
import {PollsService} from "../../polls-backend";

@Component({
  selector: 'app-already-voted',
  templateUrl: './already-voted.component.html',
  styleUrls: ['./already-voted.component.scss']
})
export class AlreadyVotedComponent {

  umfragenFrage = "Was essen Wombats?";

  constructor(private backendService: PollsService) { }

  onShowResultClick() {

  }
}
