import { Subject, BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Injectable()
export class ModalService {
  bsModalRef: BsModalRef;
  private dataSource = new BehaviorSubject({});
  data = this.dataSource.asObservable();
  constructor(private modalService: BsModalService) {

  }
  openModalWithComponent(component, modalClass: string = null) {
    this.bsModalRef = this.modalService.show(component , Object.assign({}, { class: modalClass }));
    return this.bsModalRef;
  }
  changeDataSource (data:any){
    this.dataSource.next(data);
  }
}