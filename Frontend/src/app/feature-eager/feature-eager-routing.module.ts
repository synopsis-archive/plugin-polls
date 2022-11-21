import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LehreransichtComponent } from './lehreransicht/lehreransicht.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'Lehreransicht', component: LehreransichtComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureEagerRoutingModule { }
