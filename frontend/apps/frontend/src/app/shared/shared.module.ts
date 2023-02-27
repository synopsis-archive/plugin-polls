import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphAuswertungComponent } from './graph-auswertung/graph-auswertung.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [GraphAuswertungComponent, AlertComponent],
  imports: [CommonModule],
  exports: [AlertComponent]
})
export class SharedModule {}
