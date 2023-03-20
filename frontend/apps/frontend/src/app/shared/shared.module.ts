import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphAuswertungComponent } from './graph-auswertung/graph-auswertung.component';
import { AlertComponent } from './alert/alert.component';
import { PopupComponent } from './popup/popup.component';

@NgModule({
  declarations: [GraphAuswertungComponent, AlertComponent, PopupComponent],
  imports: [CommonModule],
  exports: [AlertComponent, PopupComponent]
})
export class SharedModule {}
