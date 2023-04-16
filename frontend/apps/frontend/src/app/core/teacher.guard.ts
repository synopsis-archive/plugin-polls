import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {IDTokenPayload} from "./jwt-decoder.service";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    const token = await this.authService.getJwt();
    return this.hasPrivilegeToCreatePoll(token)
  }

  private hasPrivilegeToCreatePoll(jwtToken: IDTokenPayload) {
    const isTeacher = jwtToken.rolle.toLowerCase() !== 'schueler';

    if (!isTeacher)
      this.router.navigateByUrl('/Code').then(_ => console.log('Restricted...'));
    return isTeacher;
  }
}
