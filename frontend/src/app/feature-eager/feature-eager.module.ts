import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureEagerRoutingModule } from './feature-eager-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ErgebnissAnsichtComponent } from './ergebniss-ansicht/ergebniss-ansicht.component';


@NgModule({
  declarations: [
    ErgebnissAnsichtComponent
  ],
  imports: [
    CommonModule,
    FeatureEagerRoutingModule,
    SharedModule
  ]
})
export class FeatureEagerModule { }
