import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErgebnisComponent } from './ergebnis/ergebnis.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SchueleransichtComponent } from './schueleransicht/schueleransicht.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'Schueleransicht/:id', component: SchueleransichtComponent },
      { path: 'Ergebnisansicht', component: ErgebnisComponent },
      {path: 'PageNotFound', component: PageNotFoundComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureLazyRoutingModule { }
