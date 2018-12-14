import { map, switchMap } from 'rxjs/operators';
import { SoQuyenModel } from './../../soquyen.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subscription, timer, of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { ActionType } from 'src/app/shared/commons/action-type';
import { SoQuyenService } from './../../soquyen.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmDialog.service';
import { FromType } from 'src/app/shared/commons/form-type';
import { ToastrService } from 'ngx-toastr';
import { SwalPartialTargets, SwalComponent  } from '@toverux/ngx-sweetalert2';


@Component({
  selector: 'app-so-quyen-save',
  templateUrl: './soquyen-save.component.html'
})
export class SoQuyenSaveComponent implements OnInit , OnDestroy {

  @ViewChild('submitSwal') private submitSwal: SwalComponent;
  subscription: Subscription;
  submited: boolean;
  isUpdate: boolean;
  data: SoQuyenModel = new SoQuyenModel();
  myForm = this.fb.group({
        id: [''],
        name: ['' , [Validators.required, Validators.maxLength(30)] , [this.validateNameUnique.bind(this)] ]
  });

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private modalService: ModalService ,
          private soQuyenService: SoQuyenService, private spinner: NgxSpinnerService,
          private confirmationDialogService: ConfirmationDialogService, private toastr: ToastrService,
          public readonly swalTargets: SwalPartialTargets) {
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
      this.soQuyenService.getById(this.data.id).subscribe((res) => {

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
    this.submitSwal.show();
  }

  submitData() {
    this.spinner.show();
    this.submited = true;
    this.soQuyenService.save(this.myForm.value).subscribe((res) => {
      this.spinner.hide();
      this.toastr.success('Lưu thành công!');
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
        return this.soQuyenService.checkNameIsUnique(this.data.id, control.value.trim())
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
