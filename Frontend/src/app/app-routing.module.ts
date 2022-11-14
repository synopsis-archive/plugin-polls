import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path:'Schüleransicht',
  loadChildren:() => import('./feature-lazy/feature-lazy.module').then(x=>x.FeatureLazyModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
