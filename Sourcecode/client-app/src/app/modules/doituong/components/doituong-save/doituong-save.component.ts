import { map, switchMap } from 'rxjs/operators';
import { DoiTuongModel } from './../../doituong.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subscription, timer, of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { ActionType } from 'src/app/shared/commons/action-type';
import { DoiTuongService } from './../../doituong.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmDialog.service';
import { FromType } from 'src/app/shared/commons/form-type';

@Component({
  selector: 'app-doiTuong-save',
  templateUrl: './doituong-save.component.html'
})
export class DoiTuongSaveComponent implements OnInit , OnDestroy {

  subscription: Subscription;
  submited: boolean;
  data: DoiTuongModel = new DoiTuongModel();
  myForm = this.fb.group({
   //name: ['', [Validators.required, Validators.maxLength(30)] , this.validateNameUnique.bind(this)]

   	    doiTuongId: [''],
         
   	    name: [''],
         
  });

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private modalService: ModalService ,
          private doiTuongService: DoiTuongService, private spinner: NgxSpinnerService,
          private confirmationDialogService: ConfirmationDialogService) {
    this.subscription = this.modalService.dialogData.subscribe(data => {
      this.data.doiTuongId = data.id;
      this.getDataByID(data);
    });
  }

  ngOnInit() {

  }

  getDataByID (data) {
    if (data.formType === FromType.UPDATE) {
      this.doiTuongService.getById(this.data.doiTuongId).subscribe((res) => {

       	    this.myForm.patchValue({'doiTuongId': res.data.doiTuongId});
             
       	    this.myForm.patchValue({'name': res.data.name});
             
	  
      });
    }
	else{
		this.myForm.patchValue({'doiTuongId': data.id});
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
    const submitData = new DoiTuongModel();
    //submitData.doiTuongId = this.data.doiTuongId;
    //submitData.text = this.myForm.value.name.trim();
    this.doiTuongService.save(this.myForm.value).subscribe((res) => {
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
