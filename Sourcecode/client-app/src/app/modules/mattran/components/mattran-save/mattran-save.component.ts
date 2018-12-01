import { map, switchMap } from 'rxjs/operators';
import { MatTranModel } from './../../mattran.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subscription, timer, of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { ActionType } from 'src/app/shared/commons/action-type';
import { MatTranService } from './../../mattran.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmDialog.service';
import { FromType } from 'src/app/shared/commons/form-type';

@Component({
  selector: 'app-mat-tran-save',
  templateUrl: './mattran-save.component.html'
})
export class MatTranSaveComponent implements OnInit , OnDestroy {

  subscription: Subscription;
  submited: boolean;
  isUpdate: boolean;
  data: MatTranModel = new MatTranModel();
  myForm = this.fb.group({
        id: [''],
        ma: [''],
        thoiGian: [''],
        diaBan: [''],
        ghiChu: [''],
  });

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private modalService: ModalService ,
          private matTranService: MatTranService, private spinner: NgxSpinnerService,
          private confirmationDialogService: ConfirmationDialogService) {
    this.subscription = this.modalService.dialogData.subscribe(data => {
      this.data.id = data.id;
      this.getDataByID(data);
    });
  }

  ngOnInit() {

  }

  getDataByID (data) {
    if (data.formType === FromType.UPDATE) {
      this.isUpdate = true;
      this.matTranService.getById(this.data.id).subscribe((res) => {
          this.myForm.patchValue({'id': res.data.id});
          this.myForm.patchValue({'ma': res.data.ma});
          this.myForm.patchValue({'thoiGian': res.data.thoiGian});
          this.myForm.patchValue({'diaBan': res.data.diaBan});
          this.myForm.patchValue({'ghiChu': res.data.ghiChu});
      });
    } else {
      this.myForm.patchValue({'id': data.id});
    }
  }

  onSubmit() {

    this.submited = true;
    console.log(this.myForm);
    if ( !this.myForm.valid) {
      return;
    }

    this.confirmationDialogService.confirm('Xác nhận!', 'Bạn có thực sự muốn lưu?' );
    const dialogCloseSubscription = this.confirmationDialogService.subject.subscribe((data) => {
      dialogCloseSubscription.unsubscribe();
      if ( data === ActionType.ACCEPT) {
        this.submitData();
      }
    });
  }

  submitData() {
    this.spinner.show();
    this.submited = true;
    const submitData = new MatTranModel();
    //submitData.id = this.data.id;
    //submitData.text = this.myForm.value.name.trim();
    this.matTranService.save(this.myForm.value).subscribe((res) => {
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
}
