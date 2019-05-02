import { map, switchMap } from 'rxjs/operators';
import { HuyenModel } from './../../huyen.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subscription, timer, of, Observable } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { ActionType } from 'src/app/shared/commons/action-type';
import { HuyenService } from './../../huyen.service';
import { TinhService } from 'src/app/modules/tinh/tinh.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmDialog.service';
import { FromType } from 'src/app/shared/commons/form-type';
import { Select2Model } from 'src/app/shared/models/select2.model';

@Component({
  selector: 'app-huyen-save',
  templateUrl: './huyen-save.component.html'
})
export class HuyenSaveComponent implements OnInit , OnDestroy {

  listAllTinh: Observable<Select2Model[]>;
  subscription: Subscription;
  submited: boolean;
  data: HuyenModel = new HuyenModel();
  myForm = this.fb.group({
   //name: ['', [Validators.required, Validators.maxLength(30)] , this.validateNameUnique.bind(this)]

   	    huyenId: [''],

   	    maHuyen: ['', [Validators.required, Validators.maxLength(30)], [this.validateCodeUnique.bind(this)] ],

   	    tenHuyen: ['', [Validators.required, Validators.maxLength(30)], [this.validateNameUnique.bind(this)] ],

   	    tinhId: ['', [Validators.required] ],

   	    // type: ['', [Validators.required]],

   	    active: [''],

   	    is1990: [''],

  });

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private modalService: ModalService ,
          private huyenService: HuyenService, private tinhService: TinhService, private spinner: NgxSpinnerService,
          private confirmationDialogService: ConfirmationDialogService) {
    this.subscription = this.modalService.dialogData.subscribe(data => {
      this.data.huyenId = data.id;
      this.getDataByID(data);
    });
  }

  ngOnInit() {
    this.listAllTinh = this.tinhService.getListAllTinh();
  }

  getDataByID (data) {
    if (data.formType === FromType.UPDATE) {
      this.huyenService.getById(this.data.huyenId).subscribe((res) => {

       	    this.myForm.patchValue({'huyenId': res.data.huyenId});

       	    this.myForm.patchValue({'maHuyen': res.data.maHuyen});

       	    this.myForm.patchValue({'tenHuyen': res.data.tenHuyen});

       	    this.myForm.patchValue({'tinhId': res.data.tinhId});

       	    this.myForm.patchValue({'type': res.data.type});

       	    this.myForm.patchValue({'active': res.data.active});

       	    this.myForm.patchValue({'is1990': res.data.is1990});


      });
    }
	else{
		this.myForm.patchValue({'huyenId': data.id});
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
    const submitData = new HuyenModel();
    //submitData.huyenId = this.data.huyenId;
    //submitData.text = this.myForm.value.name.trim();
    this.huyenService.save(this.myForm.value).subscribe((res) => {
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
        return this.huyenService.checkCodeIsUnique(this.data.huyenId, control.value.trim())
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
        return this.huyenService.checkNameIsUnique(this.data.huyenId, control.value.trim())
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
