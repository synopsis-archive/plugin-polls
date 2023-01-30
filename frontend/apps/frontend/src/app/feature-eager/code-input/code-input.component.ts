import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {catchError, Observable} from 'rxjs';
import {PollDto, PollsService} from "../../polls-backend";

@Component({
  selector: 'app-code-input',
  templateUrl: './code-input.component.html',
  styleUrls: ['./code-input.component.scss']
})
export class CodeInputComponent {
  code: string = "";
  errorHidden = true;

  constructor(private router: Router, private service: PollsService) { }

  enterPressed(): void {
    if (this.code.length === 6) {
      console.log(this.code);
      this.service.pollsGetPollPollCodeGet(this.code)
        .pipe(catchError((_, x: Observable<PollDto>) => {
          this.errorHidden = false;
          setTimeout(() => this.hideError(), 3000);
          return new Observable((observer) => observer.complete());
        }))
        .subscribe(_ => this.router.navigateByUrl(`Schueleransicht/${this.code}`));
    } else {
      this.errorHidden = false;
      setTimeout(() => this.hideError(), 3000);
    }
  }

  hideError(): void {
    this.errorHidden = true;
  }
}
