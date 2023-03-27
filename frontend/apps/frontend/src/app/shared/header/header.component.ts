import { Component, Input, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
@Input() showBack : boolean = true;
  constructor(private _location : Location) { }
  ngOnInit(): void {
    this.showBack = true;
  }

  backButtonClicked():void{
    this._location.back();
  }

}
