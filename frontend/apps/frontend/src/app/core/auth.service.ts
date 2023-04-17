import { Injectable } from '@angular/core';
import {IDTokenPayload, JwtDecoderService} from "./jwt-decoder.service";
import {environment} from "../../environments/environment";
import {Configuration} from "../polls-backend";
import {LiveResultUpdateService} from "./live-result-update.service";
import {ConfigService} from "./config.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwt!: string;

  constructor(private jwtDecoder: JwtDecoderService,
              private signalRService: LiveResultUpdateService, private configService: ConfigService) { }

  async init() {
    let token = await this.jwtDecoder.getJwt();
    if(token === undefined || !environment.production)
      token = `${environment.devJwtToken}`;

    this.configService.setConfiguration(new Configuration({
      basePath: environment.backend,
      credentials: {
        'Bearer': `Bearer ${token}`
      }
    }));
    await this.signalRService.startConnection(token);
    this.jwt = token;
  }

  getJwt(): IDTokenPayload {
    return this.jwtDecoder.decodeJwt(this.jwt);
  }
}
