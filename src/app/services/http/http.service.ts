import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SpinnerService } from '../spinner/spinner.service';


@Injectable({
  providedIn: 'root'
})
export class HttpService {


  private server: any  = environment.server;

  constructor(public http: HttpClient,
    public Spinner: SpinnerService) { }

    getHeader(): any {
      const user = JSON.parse(localStorage.getItem(environment.cookie) || '{}');
      const headerDict = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type',
        Authorization: `Bearer ${ user?.accessToken || ''}`,
      }
      return new HttpHeaders(headerDict);
    }


  getHttp(page: string, params: any) {
    this.Spinner.showSpinner();
    return this.http.get(`${this.server}/${page}`, {
      headers: this.getHeader(),
      params: params
    }).pipe(catchError(this.handleError),
    finalize(() => {
      this.Spinner.hideSpinner();
    }));
  }

  postHttp(page: string, params: any) {
    this.Spinner.showSpinner();
    return this.http.post(`${this.server}/${page}`, params, { headers: this.getHeader() })
      .pipe(catchError(this.handleError),
      finalize(() => {
        this.Spinner.hideSpinner();
      }));
  }

  private handleError(error: HttpErrorResponse): string {
        switch (error.status) {
            case 404: {
                return `Not Found: ${error.message}`;
            }
            case 403: {
                return `Access Denied: ${error.message}`;
            }
            case 500: {
                return `Internal Server Error: ${error.message}`;
            }
            default: {
                return `Unknown Server Error: ${error.message}`;
            }

        }
    }

}







