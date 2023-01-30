import {Component, OnInit} from '@angular/core';
import {Configuration} from "./polls-backend";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private config: Configuration) {
  }

  ngOnInit(): void {
    this.config.credentials['Bearer'] = `Bearer ${environment.devJwtToken}`;
  }


}
