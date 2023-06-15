import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from 'src/app/modals/alertas/alert/alert.component';
import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {


  show = false;
  procurar: string = '';
  nome: string;
  constructor(private router: Router,
              private http: HttpService,
              private modalService: NgbModal) {
    const user = JSON.parse(localStorage.getItem(environment.cookie) || '{}');
    this.nome = user.name;
  }

  ngOnInit(): void {

  }


  alerta(room: any) {
    const modalRef = this.modalService.open(AlertComponent, {
      centered: true,
      backdrop: "static",

    });
    modalRef.componentInstance.dados = room;
    modalRef.result.then(result => {
      if (result != null && result.error === 0) {

      }
    });
  }


  toggle(): void {
    (this.show === false) ? this.show = true : this.show  = false;
  }

  procurarOrdem(): void {
    this.router.navigate(['/dash/procurar/', this.procurar]);
  }

  logout(){

    this.http.postHttp('Admin/logout', {})
    .subscribe((res: any) => {
          localStorage.removeItem(environment.cookie);
          this.router.navigateByUrl('/');
      }, error => this.alerta(error));

    this.toggle();
  }
}
 