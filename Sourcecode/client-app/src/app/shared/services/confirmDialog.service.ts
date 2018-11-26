import { Injectable } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmDialogComponent } from '../component/confirm-dialog/confirm-dialog.component';
import { Subject } from 'rxjs';
import { ModalType } from '../commons/modal-type';


@Injectable()
export class ConfirmationDialogService {

  subject = new Subject<any>();

  constructor(private modalService: BsModalService) { }

  public confirm(
    title: string,
    message: string,
    type: string = ModalType.CONRIRM ,
    btnOkText: string = 'Có',
    btnCancelText: string = 'Cancel',
    dialogSize: 'sm'|'lg' = 'sm') {
    const modalRef: BsModalRef = this.modalService.show(ConfirmDialogComponent, { class : dialogSize , backdrop : true });
    modalRef.content.title = title;
    modalRef.content.message = message;
    modalRef.content.btnOkText = btnOkText;
    modalRef.content.btnCancelText = btnCancelText;
    modalRef.content.btnCancelText = btnCancelText;
    modalRef.content.type = type;

    this.modalService.onHide.subscribe((data) => {
            this.subject.next(data);
    });
  }
}
