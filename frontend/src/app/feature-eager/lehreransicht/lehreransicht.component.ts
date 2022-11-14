import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lehreransicht',
  templateUrl: './lehreransicht.component.html',
  styleUrls: ['./lehreransicht.component.scss']
})

export class LehreransichtComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('LehreransichtComponent.ngOnInit()');
  }

}
