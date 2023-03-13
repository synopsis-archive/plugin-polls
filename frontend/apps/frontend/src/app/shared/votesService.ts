import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VotesService {
    //private totalVotes: Observable<number> = new Observable<number>();
    private totalVotes = 0;

    public addVote(): void {
      this.totalVotes++;
    }

    public getVote(): number{
      return this.totalVotes;
    }
}
