import { map, switchMap } from 'rxjs/operators';
import { TinhModel } from './../../tinh.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subscription, timer, of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { ActionType } from 'src/app/shared/commons/action-type';
import { TinhService } from './../../tinh.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmDialog.service';
import { FromType } from 'src/app/shared/commons/form-type';

@Component({
  selector: 'app-tinh-save',
  templateUrl: './tinh-save.component.html'
})
export class TinhSaveComponent implements OnInit , OnDestroy {

  subscription: Subscription;
  submited: boolean;
  data: TinhModel = new TinhModel();
  myForm = this.fb.group({
   // name: ['', [Validators.required, Validators.maxLength(30)] , this.validateNameUnique.bind(this)]

    tinhId: [''] ,

    maTinh: ['', [Validators.required, Validators.maxLength(30)], [this.validateCodeUnique.bind(this)] ],

    tenTinh: ['', [Validators.required], [this.validateNameUnique.bind(this)]],

    //type: ['', [Validators.required]],

    active: [false],

    is1990: [false],

    ghiChu: [''],

  });

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private modalService: ModalService ,
          private tinhService: TinhService, private spinner: NgxSpinnerService,
          private confirmationDialogService: ConfirmationDialogService) {
    this.subscription = this.modalService.dialogData.subscribe(data => {
      this.data.tinhId = data.id;
      this.getDataByID(data);
    });
  }

  ngOnInit() {
  }

  getDataByID (data) {
    if (data.formType === FromType.UPDATE) {
      this.tinhService.getById(this.data.tinhId).subscribe((res) => {

        this.myForm.patchValue({'tinhId': res.data.tinhId});

        this.myForm.patchValue({'maTinh': res.data.maTinh});

        this.myForm.patchValue({'tenTinh': res.data.tenTinh});

        this.myForm.patchValue({'type': res.data.type});

        this.myForm.patchValue({'active': res.data.active});

        this.myForm.patchValue({'is1990': res.data.is1990});

        this.myForm.patchValue({'ghiChu': res.data.ghiChu});
      });
    } else {
    this.myForm.patchValue({'tinhId': data.id});
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
    const submitData = new TinhModel();
    // submitData.tinhId = this.data.tinhId;
    // submitData.text = this.myForm.value.name.trim();
    this.tinhService.save(this.myForm.value).subscribe((res) => {
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

  validateCodeUnique(control: FormControl) {
    return timer(800).pipe(
      switchMap(() => {
        if (!control.value) {
          return of(null);
        }
        return this.tinhService.checkCodeIsUnique(this.data.tinhId, control.value.trim())
        .pipe(map((res) => {
             if (!res.data) {
               return {'isCodeDuplicate' : true};
             }
             return null;
        }));
      })
    );
  }

  validateNameUnique(control: FormControl) {
    return timer(800).pipe(
      switchMap(() => {
        if (!control.value) {
          return of(null);
        }
        return this.tinhService.checkNameIsUnique(this.data.tinhId, control.value.trim())
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
