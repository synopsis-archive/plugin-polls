import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureEagerRoutingModule } from './feature-eager-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CodeInputComponent } from './code-input/code-input.component';
import { FormsModule } from '@angular/forms';
import { LehreransichtListeComponent } from './lehreransicht-liste/lehreransicht-liste.component';
import { LehreransichtComponent } from './lehreransicht/lehreransicht.component';
@NgModule({
  declarations: [
    CodeInputComponent,
    LehreransichtComponent,
    LehreransichtListeComponent
  ],
  imports: [
    CommonModule,
    FeatureEagerRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class FeatureEagerModule { }
