import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureLazyRoutingModule } from './feature-lazy-routing.module';
import { SchueleransichtComponent } from './schueleransicht/schueleransicht.component';
import { ErgebnisComponent } from './ergebnis/ergebnis.component';
import { NgChartsModule } from 'ng2-charts';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    SchueleransichtComponent,
    ErgebnisComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    FeatureLazyRoutingModule,
    NgChartsModule
  ]
})
export class FeatureLazyModule { }
