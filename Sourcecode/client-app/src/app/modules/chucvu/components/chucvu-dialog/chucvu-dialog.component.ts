import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { ActionType } from 'src/app/shared/commons/action-type';

@Component({
  selector: 'app-chucvu-dialog',
  templateUrl: './chucvu-dialog.component.html',
  styleUrls: ['./chucvu-dialog.component.css']
})
export class ChucvuDialogComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  submited: boolean;
  myForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    website: ['', Validators.required]
  });

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private modalService: ModalService) {

    this.subscription = this.modalService.dialogData.subscribe(data => {
      console.log(data);
      // do something with data pass form parent
    });
  }
  /**
   * do somthing on init
   */
  ngOnInit() {
  }


  onSubmit() {
    console.log(this.myForm);
    this.submited = true;

    // do something to save data
    // this.bsModalRef.hide();
    // this.modalService.passDataToParent({action: ActionType.SUBMIT});
  }



  /**
   * do something when close.
   */
  onClose() {
    this.bsModalRef.hide();
    this.modalService.passDataToParent({action: ActionType.CLOSE});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
