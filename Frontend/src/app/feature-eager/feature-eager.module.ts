import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureEagerRoutingModule } from './feature-eager-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    FeatureEagerRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class FeatureEagerModule { }
