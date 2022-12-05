import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureLazyRoutingModule } from './feature-lazy-routing.module';
import { SchueleransichtComponent } from './schueleransicht/schueleransicht.component';
import { ErgebnisComponent } from './ergebnis/ergebnis.component';
import { NgChartsModule } from 'ng2-charts';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
<<<<<<< HEAD
import { FormsModule } from '@angular/forms';
=======
import { AlreadyVotedComponent } from './already-voted/already-voted.component';
>>>>>>> b94eec8c088773b8b0130e387903bbfeb3869fee


@NgModule({
  declarations: [
    SchueleransichtComponent,
    ErgebnisComponent,
    PageNotFoundComponent,
    AlreadyVotedComponent
  ],
  imports: [
    CommonModule,
    FeatureLazyRoutingModule,
    NgChartsModule,
    FormsModule
  ]
})
export class FeatureLazyModule { }
