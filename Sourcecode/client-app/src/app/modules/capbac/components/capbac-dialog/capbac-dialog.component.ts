import { CapBac } from './../../../../shared/models/cap-bac.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { ActionType } from 'src/app/shared/commons/action-type';
import { CapbacService } from 'src/app/https/capbac.service';

@Component({
  selector: 'app-capbac-dialog',
  templateUrl: './capbac-dialog.component.html',
  styleUrls: ['./capbac-dialog.component.css']
})
export class CapbacDialogComponent implements OnInit , OnDestroy {

  subscription: Subscription;
  submited: boolean;
  id: number;
  myForm = this.fb.group({
    name: ['', [Validators.required]]
  });

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private modalService: ModalService ,
          private capbacService: CapbacService) {
    this.subscription = this.modalService.dialogData.subscribe(data => {
      this.id = data.id;
    });
  }

  ngOnInit() {

  }


  onSubmit() {
    console.log(this.myForm);
    this.submited = true;
    const submitData = new CapBac ();
    submitData.CapBacId = this.id;
    submitData.Text = this.myForm.value.name;
    this.capbacService.save(submitData).subscribe((res) => {
      this.bsModalRef.hide();
      this.modalService.passDataToParent({action: ActionType.SUBMIT});
    });
  }

  onClose() {
    this.bsModalRef.hide();
    this.modalService.passDataToParent({action: ActionType.CLOSE});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
