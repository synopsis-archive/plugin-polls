import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LehreransichtComponent } from './lehreransicht/lehreransicht.component';
import { SchueleransichtComponent } from './schueleransicht/schueleransicht.component';



@NgModule({
  declarations: [
    LehreransichtComponent,
    SchueleransichtComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
