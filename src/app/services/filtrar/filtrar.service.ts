import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltrarService {


  constructor(){}

  public filtarLista(listaArray: any[], search: string | any[], filtro: string | undefined) {
    let newlista;
    if (
      listaArray.length === 0 ||
      filtro === undefined ||
      filtro === '' ||
      filtro.replace(/\s/g, '') === ''
    ) {
      newlista =  listaArray;
    } else {
      newlista = listaArray.filter((v: { [x: string]: string; }) => {
          for(let i =0; i<search.length; i++){
            if(v[search[i]]!=null && v[search[i]].toLowerCase().indexOf(filtro.toLowerCase()) >= 0){
              return true;
            }
          }
          return false;
      });
    }
    return newlista;
  }


}
