import { map, switchMap } from 'rxjs/operators';
import { LoaiDoiTuongModel } from './../../loaidoituong.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subscription, timer, of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { ActionType } from 'src/app/shared/commons/action-type';
import { LoaiDoiTuongService } from './../../loaidoituong.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmDialog.service';
import { FromType } from 'src/app/shared/commons/form-type';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-loai-doi-tuong-save',
  templateUrl: './loaidoituong-save.component.html'
})
export class LoaiDoiTuongSaveComponent implements OnInit , OnDestroy {

  subscription: Subscription;
  submited: boolean;
  isUpdate: boolean;
  data: LoaiDoiTuongModel = new LoaiDoiTuongModel();
  myForm = this.fb.group({

        id: [''],

        code: ['', [Validators.required, Validators.maxLength(30)] , this.validateCodeUnique.bind(this)],

        name: ['', [Validators.required, Validators.maxLength(100)] , this.validateNameUnique.bind(this)],

  });

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private modalService: ModalService ,
          private loaiDoiTuongService: LoaiDoiTuongService, private spinner: NgxSpinnerService,
          private confirmationDialogService: ConfirmationDialogService, private toastr: ToastrService) {
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
      this.loaiDoiTuongService.getById(this.data.id).subscribe((res) => {

            this.myForm.patchValue({'id': res.data.id});

            this.myForm.patchValue({'code': res.data.code});

            this.myForm.patchValue({'name': res.data.name});


      });
    } 	else  {
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
    this.loaiDoiTuongService.save(this.myForm.value).subscribe((res) => {
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
        return this.loaiDoiTuongService.checkNameIsUnique(this.data.id, control.value.trim())
        .pipe(map((res) => {
             if (!res.data) {
               return {'isNameDuplicate' : true};
             }
             return null;
        }));
      })
    );
  }
  validateCodeUnique(control: FormControl) {
    return timer(800).pipe(
      switchMap(() => {
        if (!control.value) {
          return of(null);
        }
        return this.loaiDoiTuongService.checkCodeIsUnique(this.data.id, control.value.trim())
        .pipe(map((res) => {
             if (!res.data) {
               return {'isCodeDuplicate' : true};
             }
             return null;
        }));
      })
    );
  }

}