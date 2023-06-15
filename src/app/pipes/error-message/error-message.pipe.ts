import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorMessage'
})
export class ErrorMessagePipe implements PipeTransform {

  private message: string = '';


  transform(value: any): string {
    if (value.message) {
      const check2 = value.message.hasOwnProperty('error');
      if (check2) {
        return this.message = value.message.error.msg || value.message.statusText;
      } else if (value.message.status >= -1) {
       return value.message.message
      } else {
        return value.message.msg || value.message ;
      }
    }
    return this.message
  }

}
