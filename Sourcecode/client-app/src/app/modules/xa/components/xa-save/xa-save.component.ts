import { map, switchMap } from 'rxjs/operators';
import { XaModel } from './../../xa.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subscription, timer, of, Observable  } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { ActionType } from 'src/app/shared/commons/action-type';
import { XaService } from './../../xa.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmDialog.service';
import { FromType } from 'src/app/shared/commons/form-type';
import { HuyenService } from 'src/app/modules/huyen/huyen.service';
import { Select2Model } from 'src/app/shared/models/select2.model';

@Component({
  selector: 'app-xa-save',
  templateUrl: './xa-save.component.html'
})
export class XaSaveComponent implements OnInit , OnDestroy {


  listAllHuyen: Observable<Select2Model[]>;
  subscription: Subscription;
  submited: boolean;
  data: XaModel = new XaModel();
  myForm = this.fb.group({
   //name: ['', [Validators.required, Validators.maxLength(30)] , this.validateNameUnique.bind(this)]

   	    xaId: [''],

   	    maXa: ['', [Validators.required, Validators.maxLength(30)], [this.validateCodeUnique.bind(this)] ],

   	    tenXa: ['', [Validators.required, Validators.maxLength(30)], [this.validateNameUnique.bind(this)] ],

   	    huyenId: [null, [Validators.required] ],

   	    maDiaChi: ['', [Validators.required] ],

   	   // type: ['', [Validators.required] ],

   	    active: [''],

   	    is1990: [''],

  });

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private modalService: ModalService ,
          private xaService: XaService, private huyenService: HuyenService, private spinner: NgxSpinnerService,
          private confirmationDialogService: ConfirmationDialogService) {
    this.subscription = this.modalService.dialogData.subscribe(data => {
      this.data.xaId = data.id;
      this.getDataByID(data);
    });
  }

  ngOnInit() {
    this.listAllHuyen = this.huyenService.getListAllHuyen();
  }

  getDataByID (data) {
    if (data.formType === FromType.UPDATE) {
      this.xaService.getById(this.data.xaId).subscribe((res) => {

       	    this.myForm.patchValue({'xaId': res.data.xaId});

       	    this.myForm.patchValue({'maXa': res.data.maXa});

       	    this.myForm.patchValue({'tenXa': res.data.tenXa});

       	    this.myForm.patchValue({'huyenId': res.data.huyenId});

       	    this.myForm.patchValue({'maDiaChi': res.data.maDiaChi});

       	    this.myForm.patchValue({'type': res.data.type});

       	    this.myForm.patchValue({'active': res.data.active});

       	    this.myForm.patchValue({'is1990': res.data.is1990});


      });
    }
	else{
		this.myForm.patchValue({'xaId': data.id});
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
    const submitData = new XaModel();
    //submitData.xaId = this.data.xaId;
    //submitData.text = this.myForm.value.name.trim();
    this.xaService.save(this.myForm.value).subscribe((res) => {
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
        return this.xaService.checkCodeIsUnique(this.data.xaId, control.value.trim())
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
        return this.xaService.checkNameIsUnique(this.data.xaId, control.value.trim())
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
