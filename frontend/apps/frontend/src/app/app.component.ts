import {Component, OnInit} from '@angular/core';
import {Configuration} from "./polls-backend";
import {environment} from "../environments/environment";
import {JwtDecoderService} from "./core/jwt-decoder.service";
import {LiveResultUpdateService} from "./core/live-result-update.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private config: Configuration, private jwtDecoder: JwtDecoderService,
              private signalRService: LiveResultUpdateService) {
  }

  ngOnInit() {
    this.jwtDecoder.getJwt().then(x => {
      this.config.credentials['Bearer'] = `Bearer ${x}`;
      this.signalRService.startConnection(x).then(_ => console.log('SignalR connection started'));
    }).catch(_ => {
      this.config.credentials['Bearer'] = `Bearer ${environment.devJwtToken}`
      this.signalRService.startConnection(environment.devJwtToken).then(_ => console.log('SignalR connection started'));
    });
  }
}
