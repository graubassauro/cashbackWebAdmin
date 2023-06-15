import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  private totalItemperPage = 30;

  constructor(){}

  public gettotalItemperPage(){
    return this.totalItemperPage;
  }
  public mountPagination(array: string | any[], page: number): any {
    const start = (page - 1) * this.totalItemperPage;
    return array.slice(start, start + this.totalItemperPage);
  }
}
