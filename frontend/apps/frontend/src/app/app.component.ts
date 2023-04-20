import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "./core/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.getJwt().rolle.toLowerCase() !== 'schueler')
      this.router.navigateByUrl('/LehreransichtListe').then(_ => console.log('Allowed...'));
  }
}
