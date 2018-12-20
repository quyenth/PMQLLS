import { map, switchMap } from 'rxjs/operators';
import { MatTranModel } from './../../mattran.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subscription, timer, of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { ActionType } from 'src/app/shared/commons/action-type';
import { MatTranService } from './../../mattran.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FromType } from 'src/app/shared/commons/form-type';
import { ToastrService } from 'ngx-toastr';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-mat-tran-save',
  templateUrl: './mattran-save.component.html'
})
export class MatTranSaveComponent implements OnInit , OnDestroy {
  @ViewChild('submitSwal') private submitSwal: SwalComponent;

  subscription: Subscription;
  submited: boolean;
  isUpdate: boolean;
  data: MatTranModel = new MatTranModel();
  myForm = this.fb.group({
        id: [''],
        ma: ['', [Validators.required, Validators.maxLength(30)], [this.validateNameUnique.bind(this)] ],
        thoiGian: [''],
        diaBan: ['', [Validators.maxLength(100)]],
        ghiChu: ['', [Validators.maxLength(250)]]
  });

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private modalService: ModalService ,
          private matTranService: MatTranService, private spinner: NgxSpinnerService,
          private toastr: ToastrService) {
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

    this.submitSwal.show();
  }

  submitData() {
    this.spinner.show();
    this.submited = true;
    const submitData = new MatTranModel();
    // submitData.id = this.data.id;
    // submitData.text = this.myForm.value.name.trim();
    this.matTranService.save(this.myForm.value).subscribe((res) => {
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
        return this.matTranService.checkCodeIsUnique(this.data.id, control.value.trim())
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
