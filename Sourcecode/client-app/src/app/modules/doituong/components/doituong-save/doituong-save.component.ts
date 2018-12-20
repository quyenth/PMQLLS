import { map, switchMap } from 'rxjs/operators';
import { DoiTuongModel } from './../../doituong.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subscription, timer, of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { ActionType } from 'src/app/shared/commons/action-type';
import { DoiTuongService } from './../../doituong.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FromType } from 'src/app/shared/commons/form-type';
import { ToastrService } from 'ngx-toastr';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-doi-tuong-save',
  templateUrl: './doituong-save.component.html'
})
export class DoiTuongSaveComponent implements OnInit , OnDestroy {

  @ViewChild('submitSwal') private submitSwal: SwalComponent;

  subscription: Subscription;
  submited: boolean;
  isUpdate: boolean;
  data: DoiTuongModel = new DoiTuongModel();
  myForm = this.fb.group({
      doiTuongId: [''],
      name: ['', [Validators.required, Validators.maxLength(30)] , this.validateNameUnique.bind(this)],
  });

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private modalService: ModalService ,
          private doiTuongService: DoiTuongService, private spinner: NgxSpinnerService,
          private toastr: ToastrService) {
    this.subscription = this.modalService.dialogData.subscribe(data => {
      this.data.doiTuongId = data.id;
      this.getDataByID(data);
    });
  }

  ngOnInit() {

  }

  getDataByID (data) {
    if (data.formType === FromType.UPDATE) {
      this.isUpdate = true;
      this.doiTuongService.getById(this.data.doiTuongId).subscribe((res) => {
            this.myForm.patchValue({'doiTuongId': res.data.doiTuongId});
            this.myForm.patchValue({'name': res.data.name});
      });
    } else {
      this.myForm.patchValue({'doiTuongId': data.id});
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
    const submitData = new DoiTuongModel();
    this.doiTuongService.save(this.myForm.value).subscribe((res) => {
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
        return this.doiTuongService.checkNameIsUnique(this.data.doiTuongId, control.value.trim())
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
