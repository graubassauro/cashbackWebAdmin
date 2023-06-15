import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-erase-alert',
  templateUrl: './erase-alert.component.html',
  styleUrls: ['./erase-alert.component.css']
})
export class EraseAlertComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void{}

  dismiss(data: number): void {
    this.activeModal.close(data);
  }
}
