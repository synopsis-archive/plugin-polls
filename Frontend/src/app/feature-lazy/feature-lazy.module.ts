import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureLazyRoutingModule } from './feature-lazy-routing.module';
import { SchueleransichtComponent } from './schueleransicht/schueleransicht.component';
import { ErgebnisComponent } from './ergebnis/ergebnis.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    SchueleransichtComponent,
    ErgebnisComponent
  ],
  imports: [
    CommonModule,
    FeatureLazyRoutingModule,
    NgChartsModule
  ]
})
export class FeatureLazyModule { }
