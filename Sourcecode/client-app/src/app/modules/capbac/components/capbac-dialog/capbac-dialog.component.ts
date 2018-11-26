import { CapBac } from './../../../../shared/models/cap-bac.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { ActionType } from 'src/app/shared/commons/action-type';
import { CapbacService } from 'src/app/https/capbac.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmDialog.service';
import { FromType } from 'src/app/shared/commons/form-type';

@Component({
  selector: 'app-capbac-dialog',
  templateUrl: './capbac-dialog.component.html',
  styleUrls: ['./capbac-dialog.component.css']
})
export class CapbacDialogComponent implements OnInit , OnDestroy {

  subscription: Subscription;
  submited: boolean;
  data: CapBac = new CapBac();
  myForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(50)] , this.validateNameUnique.bind(this)]
  });

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private modalService: ModalService ,
          private capbacService: CapbacService, private spinner: NgxSpinnerService,
          private confirmationDialogService: ConfirmationDialogService) {
    this.subscription = this.modalService.dialogData.subscribe(data => {
      this.data.capBacId = data.id;
      this.getDataByID(data);
    });
  }

  ngOnInit() {

  }

  getDataByID (data) {
    if (data.formType === FromType.UPDATE) {
      this.capbacService.getById(this.data.capBacId).subscribe((res) => {
        this.data.text = res.data.text;
        this.myForm.patchValue({'name': this.data.text});
      });
    }
  }

  onSubmit() {
    console.log(this.myForm);
    // this.confirmationDialogService.confirm('Xác nhận!', 'Bạn có thực sự muốn lưu?' );
    // const dialogCloseSubscription = this.confirmationDialogService.subject.subscribe((data) => {
    //   dialogCloseSubscription.unsubscribe();
    //   if ( data === ActionType.ACCEPT) {
    //     this.submitData();
    //   }
    // });
  }

  submitData() {
      console.log(this.myForm);
    this.spinner.show();
    this.submited = true;
    const submitData = new CapBac ();
    submitData.capBacId = this.data.capBacId;
    submitData.text = this.myForm.value.name;
    this.capbacService.save(submitData).subscribe((res) => {
      this.spinner.hide();
      this.bsModalRef.hide();
      this.modalService.passDataToParent({action: ActionType.SUBMIT});
    }, (error) => {
      console.log(error);
      this.spinner.hide();
    });
  }

  onClose() {
    this.bsModalRef.hide();
    this.modalService.passDataToParent({action: ActionType.CLOSE});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  validateNameUnique(control: FormControl) {
      const primise = new Promise((resole, reject) => {
        setTimeout(() => {
          resole({'isNameDuplicate' : true});
        }, 1500);
      });
      return primise;
  }
}
