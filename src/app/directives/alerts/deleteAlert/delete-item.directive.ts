import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EraseAlertComponent } from './erase-alert/erase-alert.component';

@Directive({
  selector: '[appDeleteItem]'
})
export class DeleteItemDirective {

  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  @HostListener('click') onClick() {
    this.deleteItem();
  }


  deleteItem(): void {
    const modalRef = this.modalService.open(EraseAlertComponent, {
      centered: true,
      backdrop: 'static',
    });

    modalRef.result.then(result => {
      if (result >= 1 ) {
            this.delete.emit(result);
      }
    });
  }

}
