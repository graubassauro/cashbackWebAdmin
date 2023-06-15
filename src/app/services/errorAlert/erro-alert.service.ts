import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErroAlertService {

  constructor() { }

  IsJsonString(str:any) {
    let message;
    try {
       message =  str.error.msg
    } catch (e) {
      message = str.error || str;
    }
    return message;
}

  checkMessage = (error: any) => this.IsJsonString(error);

}
