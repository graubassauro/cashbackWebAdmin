import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-box',
  templateUrl: './error-box.component.html',
  styleUrls: ['./error-box.component.css']
})
export class ErrorBoxComponent implements OnInit {

  @Input() error:  any;
  classTipo = ['alert-danger', 'alert-success', 'alert-warning'];

  timmerTo: any;

    constructor() { }

    ngOnInit(): void {
        this.timmerTo = setTimeout(() => this.closeX(), 3000)
     }

      closeX(){
        if(this.timmerTo){
          clearTimeout(this.timmerTo);
        }
        this.error = '';
      }


  }

