import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PollsService } from '../../swagger';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-code-input',
  templateUrl: './code-input.component.html',
  styleUrls: ['./code-input.component.scss']
})
export class CodeInputComponent {

  code: string = "";
  errorHidden = true;

  constructor(private router: Router, private service: PollsService) { }



  enterPressend(): void {
    if (this.code.length === 6) {
      console.log(this.code);
      this.service.pollsGetPollPollCodeGet(this.code)
        .pipe(catchError((nadler, x) => {
          this.errorHidden = false;
          setTimeout(() => this.hideError(), 3000);
          return nadler;
        }))
        .subscribe(poll => this.router.navigate(['/Schueleransicht/' + this.code]));
    } else {
      this.errorHidden = false;
      setTimeout(() => this.hideError(), 3000);
    }
  }

  hideError(): void {
    this.errorHidden = true;
  }

}
