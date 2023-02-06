import { Injectable } from '@angular/core';
import jwtDecode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtDecoderService {

  constructor() { }

  public getJwt(): Promise<string> {
    parent.postMessage({
      method: "getIDToken"
    }, "*");

    const promise = new Promise<string>((resolve) => {
      window.addEventListener("message", (event) => {
        if (event.data.method === "getIDToken") {
          if(event.data.data === undefined)
            throw new Error('No JWT token found');
          resolve(event.data.data);
        }
      });
    });

    return promise;
  }

  public decodeJwt(token: string): IDTokenPayload {
    const payload = jwtDecode<IDTokenPayload>(token);
    payload.connectedPlatformsDeserialized = JSON.parse(payload.connectedPlatforms);
    return payload;
  }

}

// modelled after the Claims Property of class IDToken in the Core.Backend.Secure project
export interface IDTokenPayload {
  // type: "id-token"
  type: string,

  // username: ldap-username
  username: string,

  // uid: db-uuid
  uuid: string,

  // rolle: <schüler, lehrer, staff>
  rolle: string,

  // Email
  email: string,

  // connectedPlatforms: serialisiertes Json-Array -- Plattformen mit hinterlegten credentials
  connectedPlatforms: string,

  // connectedPlatformsDeserialized: connectedPlatforms, oba deserialisiert
  connectedPlatformsDeserialized: string[],

  // matrikelnummer - nur bei Schülern verfügbar
  matrikelnummer: string | undefined,

  // klasse - nur bei Schülern verfügbar
  klasse: string | undefined,
}
