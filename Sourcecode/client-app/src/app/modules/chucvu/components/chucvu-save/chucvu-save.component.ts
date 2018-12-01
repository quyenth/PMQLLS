import { map, switchMap } from 'rxjs/operators';
import { ChucVuModel } from './../../chucvu.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subscription, timer, of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { ActionType } from 'src/app/shared/commons/action-type';
import { ChucVuService } from './../../chucvu.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmDialog.service';
import { FromType } from 'src/app/shared/commons/form-type';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-chucVu-save',
  templateUrl: './chucvu-save.component.html'
})
export class ChucVuSaveComponent implements OnInit , OnDestroy {

  subscription: Subscription;
  submited: boolean;
  isUpdate: boolean;
  data: ChucVuModel = new ChucVuModel();
  myForm = this.fb.group({
   //name: ['', [Validators.required, Validators.maxLength(30)] , this.validateNameUnique.bind(this)]

   	    chucVuId: [''],
         
   	    code: [''],
         
   	    name: [''],
         
  });

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private modalService: ModalService ,
          private chucVuService: ChucVuService, private spinner: NgxSpinnerService,
          private confirmationDialogService: ConfirmationDialogService, private toastr: ToastrService) {
    this.subscription = this.modalService.dialogData.subscribe(data => {
      this.data.chucVuId = data.id;
      this.getDataByID(data);
    });
  }

  ngOnInit() {

  }

  getDataByID (data) {
    if (data.formType === FromType.UPDATE) {
	  this.isUpdate = true;
      this.chucVuService.getById(this.data.chucVuId).subscribe((res) => {

       	    this.myForm.patchValue({'chucVuId': res.data.chucVuId});
             
       	    this.myForm.patchValue({'code': res.data.code});
             
       	    this.myForm.patchValue({'name': res.data.name});
             
	  
      });
    }
	else{
		this.myForm.patchValue({'chucVuId': data.id});
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
    const submitData = new ChucVuModel();
    //submitData.chucVuId = this.data.chucVuId;
    //submitData.text = this.myForm.value.name.trim();
    this.chucVuService.save(this.myForm.value).subscribe((res) => {
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

  
  
}
