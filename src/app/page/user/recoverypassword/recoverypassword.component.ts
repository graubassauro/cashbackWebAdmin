import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from 'src/app/modals/alertas/alert/alert.component';
import { HttpService } from 'src/app/services/http/http.service';


@Component({
  selector: 'app-recoverypassword',
  templateUrl: './recoverypassword.component.html',
  styleUrls: ['./recoverypassword.component.css']
})
export class RecoverypasswordComponent implements OnInit {


  error: any = '';
  addClientform: FormGroup;

  constructor(private http: HttpService,
              private fb: FormBuilder,
              private router: Router,
              private modalService: NgbModal) {

    this.addClientform = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });


  }

  ngOnInit() { }

  login() {
    this.router.navigateByUrl('/newpassword');
  }
/*

  alerta(room: any) {
    const modalRef = this.modalService.open(AlertComponent, {
      centered: true,
      backdrop: "static"
    });
    modalRef.componentInstance.dados = room;
    modalRef.result.then(result => {
      if (result != null && result.error === 0) {

      }
    });
  }

  login() {
    this.http.getHttp('Admin/recovery', this.addClientform.value)
      .subscribe((res: any) => {
        this.error = { message: res.msg, typo: 1 };
        this.addClientform.reset()
      }, error =>  this.error = { message: error, typo: 0 });
  }*/
}


