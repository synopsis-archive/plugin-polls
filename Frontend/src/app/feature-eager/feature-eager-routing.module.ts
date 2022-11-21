import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErgebnissAnsichtComponent } from './ergebniss-ansicht/ergebniss-ansicht.component';
import { LehreransichtComponent } from './lehreransicht/lehreransicht.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'Lehreransicht', component: LehreransichtComponent },
    {path: 'Ergebnissanischt', component: ErgebnissAnsichtComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureEagerRoutingModule { }
