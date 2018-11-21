import { Subject, BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Injectable()
export class ModalService {
  bsModalRef: BsModalRef;
  //data of parent component
  private parentDataSource = new Subject<any>();
  //data of dialog component
  private dialogDataSource = new Subject<any>();
  parentdata = this.parentDataSource.asObservable();
  dialogData = this.dialogDataSource.asObservable();
  constructor(private modalService: BsModalService) {

  }
  openModalWithComponent(component,data:any, modalClass: string = null) {
    this.bsModalRef = this.modalService.show(component , Object.assign({}, { class: modalClass }));
    this.passDataToDialog(data);
  }
  /**
   * pass data to dialog via subscription.
   * @param data 
   */
  passDataToDialog (data:any){
    this.dialogDataSource.next(data);
  }

  passDataToParent(data:any){
    this.parentDataSource.next(data);
  }


}