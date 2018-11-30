import { map, switchMap } from 'rxjs/operators';
import { ThoiKyModel } from './../../thoiky.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subscription, timer, of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { ActionType } from 'src/app/shared/commons/action-type';
import { ThoiKyService } from './../../thoiky.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmDialog.service';
import { FromType } from 'src/app/shared/commons/form-type';

@Component({
  selector: 'app-thoi-ky-save',
  templateUrl: './thoiky-save.component.html'
})
export class ThoiKySaveComponent implements OnInit , OnDestroy {

  subscription: Subscription;
  isUpdate: boolean;
  submited: boolean;
  data: ThoiKyModel = new ThoiKyModel();
  myForm = this.fb.group({
        id: [''],
        name: ['', [Validators.required, Validators.maxLength(30)], [this.validateNameUnique.bind(this)] ]
  });

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private modalService: ModalService ,
          private thoiKyService: ThoiKyService, private spinner: NgxSpinnerService,
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
      this.thoiKyService.getById(this.data.id).subscribe((res) => {
            this.myForm.patchValue({'id': res.data.id});
            this.myForm.patchValue({'name': res.data.name});
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
    const submitData = new ThoiKyModel();
     submitData.id = this.data.id;
     submitData.name = this.myForm.value.name.trim();
    this.thoiKyService.save(this.myForm.value).subscribe((res) => {
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
    return timer(800).pipe(
      switchMap(() => {
        if (!control.value) {
          return of(null);
        }
        return this.thoiKyService.checkNameIsUnique(this.data.id, control.value.trim())
        .pipe(map((res) => {
             if (!res.data) {
               return {'isNameDuplicate' : true};
             }
             return null;
        }));
      })
    );
  }
}
