import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-code-input',
  templateUrl: './code-input.component.html',
  styleUrls: ['./code-input.component.scss']
})
export class CodeInputComponent  {

  code: string = "";
  errorHidden = true;

  constructor(private router:Router) { }

  

  enterPressend():void{
    if(this.code.length === 6){
      console.log(this.code);
      this.router.navigate(['/Schueleransicht']);
    } else {
      this.errorHidden = false;
      setTimeout(() => this.hideError(), 3000);
    }
  }

  hideError():void{
    this.errorHidden = true;
  }

}
