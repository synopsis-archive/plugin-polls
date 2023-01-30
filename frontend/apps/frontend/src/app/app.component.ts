import {Component, OnInit} from '@angular/core';
import {Configuration} from "./polls-backend";
import {environment} from "../environments/environment";
import {JwtDecoderService} from "./core/jwt-decoder.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private config: Configuration, private jwtDecoder: JwtDecoderService) {
  }

  ngOnInit(): void {
    this.jwtDecoder.getJwt().then(x => {
      console.log(x)
      this.config.credentials['Bearer'] = `Bearer ${x}`;
    }).catch(err => {
      this.config.credentials['Bearer'] = `Bearer ${environment.devJwtToken}`
      console.error(err);
    });
  }

}
