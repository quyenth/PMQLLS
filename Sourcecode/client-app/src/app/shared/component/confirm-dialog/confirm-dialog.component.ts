import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActionType } from '../../commons/action-type';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;
  @Input() type: string;


  constructor(private bsModalRef: BsModalRef, private modalService: BsModalService) { }

  ngOnInit() {
  }

  public cancel() {
    this.modalService.setDismissReason(ActionType.CANCEL);
    this.bsModalRef.hide();
  }

  public accept() {
    this.modalService.setDismissReason(ActionType.ACCEPT);
    this.bsModalRef.hide();
  }

  public dismiss() {
    this.modalService.setDismissReason('dismiss');
    this.bsModalRef.hide();
  }
}
