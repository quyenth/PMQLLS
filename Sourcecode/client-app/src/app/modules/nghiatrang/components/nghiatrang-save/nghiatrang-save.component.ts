import { map, switchMap } from 'rxjs/operators';
import { NghiaTrangModel } from './../../nghiatrang.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subscription, timer, of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { ActionType } from 'src/app/shared/commons/action-type';
import { NghiaTrangService } from './../../nghiatrang.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmDialog.service';
import { FromType } from 'src/app/shared/commons/form-type';
import { ToastrService } from 'ngx-toastr';
import { SwalComponent } from '@toverux/ngx-sweetalert2';


@Component({
  selector: 'app-nghia-trang-save',
  templateUrl: './nghiatrang-save.component.html'
})
export class NghiaTrangSaveComponent implements OnInit , OnDestroy {
  @ViewChild('submitSwal') private submitSwal: SwalComponent;

  subscription: Subscription;
  submited: boolean;
  isUpdate: boolean;
  data: NghiaTrangModel = new NghiaTrangModel();
  myForm = this.fb.group({

   	    nghiaTrangId: [''],

   	    maNghiaTrang: [''],

   	    tenNghiaTrang: ['' , [Validators.required]],

  });

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private modalService: ModalService ,
          private nghiaTrangService: NghiaTrangService, private spinner: NgxSpinnerService,
          private confirmationDialogService: ConfirmationDialogService, private toastr: ToastrService) {
    this.subscription = this.modalService.dialogData.subscribe(data => {
      this.data.nghiaTrangId = data.id;
      this.getDataByID(data);
    });
  }

  ngOnInit() {

  }

  getDataByID (data) {
    if (data.formType === FromType.UPDATE) {
	  this.isUpdate = true;
      this.nghiaTrangService.getById(this.data.nghiaTrangId).subscribe((res) => {

       	    this.myForm.patchValue({'nghiaTrangId': res.data.nghiaTrangId});

       	    this.myForm.patchValue({'maNghiaTrang': res.data.maNghiaTrang});

       	    this.myForm.patchValue({'tenNghiaTrang': res.data.tenNghiaTrang});


      });
    }
	else{
		this.myForm.patchValue({'nghiaTrangId': data.id});
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
    const submitData = new NghiaTrangModel();

    this.nghiaTrangService.save(this.myForm.value).subscribe((res) => {
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
