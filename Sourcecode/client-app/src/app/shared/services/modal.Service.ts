import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Injectable()
export class ModalService {
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService) {

  }
  openModalWithComponent(component){
    debugger;
    this.bsModalRef = this.modalService.show(component);
    return this.bsModalRef;
  }
}