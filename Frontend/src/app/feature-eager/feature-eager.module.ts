import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureEagerRoutingModule } from './feature-eager-routing.module';
import { SharedModule } from '../shared/shared.module';
<<<<<<< HEAD
import { ErgebnissAnsichtComponent } from './ergebniss-ansicht/ergebniss-ansicht.component';
import { FormsModule } from '@angular/forms';
=======
>>>>>>> 1af6dff283d3b3078606e950462ceef6bdbc1b68


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
