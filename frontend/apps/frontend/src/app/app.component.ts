import { Component, OnInit } from '@angular/core';
import { Configuration } from "./polls-backend";
import { environment } from "../environments/environment";
import { JwtDecoderService } from "./core/jwt-decoder.service";
import { LiveResultUpdateService } from "./core/live-result-update.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private config: Configuration, private jwtDecoder: JwtDecoderService,
    private signalRService: LiveResultUpdateService, private router: Router) {
  }

  ngOnInit() {
    this.jwtDecoder.getJwt().then(x => {
      if (x === undefined)
        throw new Error('No JWT token found');
      this.config.credentials['Bearer'] = `Bearer ${x}`;
      this.signalRService.startConnection(x).then(_ => console.log('SignalR connection started'));
      if (this.jwtDecoder.decodeJwt(x).rolle.toLowerCase() !== 'schueler'){
        this.router.navigateByUrl('/LehreransichtListe').then(_ => console.log('Allowed...'));
      }
  }).catch(_ => {
    this.config.credentials['Bearer'] = `Bearer ${environment.devJwtToken}`
      this.signalRService.startConnection(environment.devJwtToken).then(_ => console.log('SignalR connection started'));
      if (this.jwtDecoder.decodeJwt(environment.devJwtToken).rolle.toLowerCase() !== 'schueler'){
        this.router.navigateByUrl('/LehreransichtListe').then(_ => console.log('Allowed...'));
      }
    });
  }
}
