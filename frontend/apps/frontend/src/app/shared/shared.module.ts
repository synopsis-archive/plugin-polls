import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphAuswertungComponent } from './graph-auswertung/graph-auswertung.component';
import { AlertComponent } from './alert/alert.component';
import { PopupComponent } from './popup/popup.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    GraphAuswertungComponent,
    AlertComponent,
    PopupComponent,
    HeaderComponent,
  ],
  imports: [CommonModule],
  exports: [AlertComponent, PopupComponent, HeaderComponent],
})
export class SharedModule {}
