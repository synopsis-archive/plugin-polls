import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './feature-lazy/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/Code', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./feature-lazy/feature-lazy.module').then(x => x.FeatureLazyModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
