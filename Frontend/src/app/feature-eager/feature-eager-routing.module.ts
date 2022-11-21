import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LehreransichtListeComponent } from './lehreransicht-liste/lehreransicht-liste.component';
import { LehreransichtComponent } from './lehreransicht/lehreransicht.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'Lehreransicht', component: LehreransichtComponent },
    {path: 'LehreransichtListe', component:LehreransichtListeComponent}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureEagerRoutingModule { }
