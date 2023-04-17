import { Injectable } from '@angular/core';
import {Configuration} from "../polls-backend";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config!: Configuration;

  constructor() { }

  setConfiguration(config: Configuration) {
    this.config = config;
  }

  getConfiguration() {
    return this.config;
  }
}
