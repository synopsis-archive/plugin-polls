import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureLazyRoutingModule } from './feature-lazy-routing.module';
import { SchueleransichtComponent } from './schueleransicht/schueleransicht.component';


@NgModule({
  declarations: [
    SchueleransichtComponent
  ],
  imports: [
    CommonModule,
    FeatureLazyRoutingModule
  ]
})
export class FeatureLazyModule { }
