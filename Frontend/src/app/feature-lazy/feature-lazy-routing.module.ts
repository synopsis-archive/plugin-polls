import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchueleransichtComponent } from './schueleransicht/schueleransicht.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'',component: SchueleransichtComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureLazyRoutingModule { }
