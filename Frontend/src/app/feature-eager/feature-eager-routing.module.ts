import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeInputComponent } from './code-input/code-input.component';
import { LehreransichtComponent } from './lehreransicht/lehreransicht.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'Lehreransicht', component: LehreransichtComponent },
    { path: 'Code', component: CodeInputComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureEagerRoutingModule { }
