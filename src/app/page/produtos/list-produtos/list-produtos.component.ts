import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-produtos',
  templateUrl: './list-produtos.component.html',
  styleUrls: ['./list-produtos.component.css']
})
export class ListProdutosComponent implements OnInit {

  error: any ='';
  constructor() { }

  ngOnInit(): void {
  }

}
