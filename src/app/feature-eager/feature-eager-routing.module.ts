import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LehreransichtComponent } from './lehreransicht/lehreransicht.component';
import { SchueleransichtComponent } from './schueleransicht/schueleransicht.component';

const routes: Routes = [{
  path: 'umfragen',
  children: [
    { path: 'Lehreransicht', component: LehreransichtComponent },
    { path: 'Schueleransicht', component: SchueleransichtComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureEagerRoutingModule { }
