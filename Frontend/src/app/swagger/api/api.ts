export * from './polls.service';
import { PollsService } from './polls.service';
export * from './weatherForecast.service';
import { WeatherForecastService } from './weatherForecast.service';
export const APIS = [PollsService, WeatherForecastService];
