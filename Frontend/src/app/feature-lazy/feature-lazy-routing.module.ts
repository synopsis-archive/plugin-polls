import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErgebnisComponent } from './ergebnis/ergebnis.component';
import { SchueleransichtComponent } from './schueleransicht/schueleransicht.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'Schueleransicht', component: SchueleransichtComponent },
      { path: 'Ergebnisansicht', component: ErgebnisComponent }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureLazyRoutingModule { }
