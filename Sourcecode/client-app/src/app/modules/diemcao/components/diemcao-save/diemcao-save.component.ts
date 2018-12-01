import { map, switchMap } from 'rxjs/operators';
import { DiemCaoModel } from './../../diemcao.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subscription, timer, of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { ActionType } from 'src/app/shared/commons/action-type';
import { DiemCaoService } from './../../diemcao.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmDialog.service';
import { FromType } from 'src/app/shared/commons/form-type';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-diemCao-save',
  templateUrl: './diemcao-save.component.html'
})
export class DiemCaoSaveComponent implements OnInit , OnDestroy {

  subscription: Subscription;
  submited: boolean;
  isUpdate: boolean;
  data: DiemCaoModel = new DiemCaoModel();
  myForm = this.fb.group({
   //name: ['', [Validators.required, Validators.maxLength(30)] , this.validateNameUnique.bind(this)]

   	    diemCaoId: [''],
         
   	    ma: [''],
         
   	    ten: [''],
         
   	    diaChi: [''],
         
   	    note: [''],
         
  });

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private modalService: ModalService ,
          private diemCaoService: DiemCaoService, private spinner: NgxSpinnerService,
          private confirmationDialogService: ConfirmationDialogService, private toastr: ToastrService) {
    this.subscription = this.modalService.dialogData.subscribe(data => {
      this.data.diemCaoId = data.id;
      this.getDataByID(data);
    });
  }

  ngOnInit() {

  }

  getDataByID (data) {
    if (data.formType === FromType.UPDATE) {
	  this.isUpdate = true;
      this.diemCaoService.getById(this.data.diemCaoId).subscribe((res) => {

       	    this.myForm.patchValue({'diemCaoId': res.data.diemCaoId});
             
       	    this.myForm.patchValue({'ma': res.data.ma});
             
       	    this.myForm.patchValue({'ten': res.data.ten});
             
       	    this.myForm.patchValue({'diaChi': res.data.diaChi});
             
       	    this.myForm.patchValue({'note': res.data.note});
             
	  
      });
    }
	else{
		this.myForm.patchValue({'diemCaoId': data.id});
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
    const submitData = new DiemCaoModel();
    //submitData.diemCaoId = this.data.diemCaoId;
    //submitData.text = this.myForm.value.name.trim();
    this.diemCaoService.save(this.myForm.value).subscribe((res) => {
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
