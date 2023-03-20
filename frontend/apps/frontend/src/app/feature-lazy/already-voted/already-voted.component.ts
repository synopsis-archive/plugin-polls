import { Component, OnInit } from '@angular/core';
import {PollsService} from "../../polls-backend";
import {Location} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-already-voted',
  templateUrl: './already-voted.component.html',
  styleUrls: ['./already-voted.component.scss']
})
export class AlreadyVotedComponent implements OnInit {

  umfragenFrage:string = "";

  code: string = "";
  codeInput: string = '';

  constructor(private activatedRoute: ActivatedRoute,private router: Router,private backendService: PollsService,private _location: Location) { }

  ngOnInit(): void {

  this.activatedRoute.paramMap.subscribe(x=> this.codeInput = x.get('id') ?? 'UNKNOWN');
  this.code = this.codeInput.toString();
    //this.umfragenFrage = `Für die Abstimmung mit dem Code ${this.code} haben sie bereits abgestimmt`;
  }



  onShowResultClick() {
    this.router.navigateByUrl(`Ergebnisansicht/${this.code}`);
  }

  backButtonClicked():void{
    this._location.back();
  }
}
