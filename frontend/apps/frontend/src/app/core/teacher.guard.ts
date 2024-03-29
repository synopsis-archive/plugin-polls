import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {JwtDecoderService} from "./jwt-decoder.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanActivate {
  constructor(private tokenService: JwtDecoderService, private router: Router) { }

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
    return await this.tokenService.getJwt().then(x => {
      return this.hasPrivilegeToCreatePoll(x);
    }).catch(_ => {
      return this.hasPrivilegeToCreatePoll(environment.devJwtToken);
    });
  }

  private hasPrivilegeToCreatePoll(jwtToken: string) {
    const isTeacher = this.tokenService.decodeJwt(jwtToken).rolle.toLowerCase() !== 'schueler';

    if (!isTeacher)
      this.router.navigateByUrl('/Code').then(_ => console.log('Restricted...'));
    else
      this.router.navigateByUrl('/Lehreransicht').then(_ => console.log('Allowed...'));
    return isTeacher;
  }
}
