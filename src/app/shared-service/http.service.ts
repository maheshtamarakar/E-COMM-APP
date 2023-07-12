import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl = "";
  domain: undefined | string;
  AUTH_TOKEN = 'auth_token';
  durationInSeconds = 5;

  constructor(
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar
  ) {
    this.domain = environment.domain;
  }

  get(url: string, params?: any): Observable<any> {
    const data = { params, headers: this.getAuthHeader() };
    return this.httpClient
      .get(this.domain + url, data).pipe(catchError(this.errorHandler.bind(this)));
  }

  private errorHandler(response: any) {
    const error = response.error;
    const keys = Object.keys(error);
    const key = keys[0];
    let message = error[key];
    if (response.status === 401) {
      // auth token delete
      // redirect login page
    }
    if (error[key] instanceof Array) {
      message = error[key][0];
    }
    if (key === 'isTrusted') {
      // this will occur when not connected to internet
      message = "Please connect to Internet"
      // this.openSnackBar(message, 'Ok')
    } else {
      message = key + ' : ' + message;
      console.log(message);      
    }
    // call snackbar and show error with message
    this._snackBar.open(message, 'Ok', {
      duration: this.durationInSeconds * 3000,
        });
    // const err = new Error(message); 
    return throwError({ messages: message, error });
    // return throwError(() => err);
  }

  private getAuthHeader(): { [header: string]: string | string[]; } {
    return {
      Authorization: `Bearer ${localStorage.getItem(this.AUTH_TOKEN)}`
    };
  }
}
