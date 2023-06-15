import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ErroAlertService } from 'src/app/services/errorAlert/erro-alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() dados: any;
  message: any ;
  constructor(public activeModal: NgbActiveModal,
    private error: ErroAlertService) { }

  ngOnInit(): void {
    if(this.dados){
      this.message = this.error.IsJsonString(this.dados);
      setTimeout(() => {
        this.dismiss('');
      }, 1113000);
    }
  }


  dismiss(data: string) {
    this.activeModal.close(data);
  }

}
