import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureLazyRoutingModule } from './feature-lazy-routing.module';
import { SchueleransichtComponent } from './schueleransicht/schueleransicht.component';
import { ErgebnisComponent } from './ergebnis/ergebnis.component';


@NgModule({
  declarations: [
    SchueleransichtComponent,
    ErgebnisComponent
  ],
  imports: [
    CommonModule,
    FeatureLazyRoutingModule
  ]
})
export class FeatureLazyModule { }
