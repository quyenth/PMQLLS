import { map, switchMap } from 'rxjs/operators';
import { DonViModel } from './../../donvi.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subscription, timer, of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { ActionType } from 'src/app/shared/commons/action-type';
import { DonViService } from './../../donvi.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmDialog.service';
import { FromType } from 'src/app/shared/commons/form-type';

@Component({
  selector: 'app-donVi-save',
  templateUrl: './donvi-save.component.html'
})
export class DonViSaveComponent implements OnInit , OnDestroy {

  subscription: Subscription;
  submited: boolean;
  data: DonViModel = new DonViModel();
  myForm = this.fb.group({
   //name: ['', [Validators.required, Validators.maxLength(30)] , this.validateNameUnique.bind(this)]

   	    donViId: [''],
         
   	    maDonVi: [''],
         
   	    tenDonVi: [''],
         
   	    tenVietTat: [''],
         
   	    maDonViCha: [''],
         
   	    phanMuc: [''],
         
   	    phanCap: [''],
         
   	    phanKhoi: [''],
         
   	    ghiChu: [''],
         
   	    active: [''],
         
   	    cQCS_Ten: [''],
         
   	    cQCS_DiaChi: [''],
         
   	    cQCS_DienThoai: [''],
         
   	    cQCS_HomThu: [''],
         
   	    cQCS_ThuTruong: [''],
         
   	    cQCS_ThuTruongChucVu: [''],
         
   	    cQCS_NguoiPhuTrach: [''],
         
   	    cQCS_NguoiPhuTrachPhone: [''],
         
  });

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private modalService: ModalService ,
          private donViService: DonViService, private spinner: NgxSpinnerService,
          private confirmationDialogService: ConfirmationDialogService) {
    this.subscription = this.modalService.dialogData.subscribe(data => {
      this.data.donViId = data.id;
      this.getDataByID(data);
    });
  }

  ngOnInit() {

  }

  getDataByID (data) {
    if (data.formType === FromType.UPDATE) {
      this.donViService.getById(this.data.donViId).subscribe((res) => {

       	    this.myForm.patchValue({'donViId': res.data.donViId});
             
       	    this.myForm.patchValue({'maDonVi': res.data.maDonVi});
             
       	    this.myForm.patchValue({'tenDonVi': res.data.tenDonVi});
             
       	    this.myForm.patchValue({'tenVietTat': res.data.tenVietTat});
             
       	    this.myForm.patchValue({'maDonViCha': res.data.maDonViCha});
             
       	    this.myForm.patchValue({'phanMuc': res.data.phanMuc});
             
       	    this.myForm.patchValue({'phanCap': res.data.phanCap});
             
       	    this.myForm.patchValue({'phanKhoi': res.data.phanKhoi});
             
       	    this.myForm.patchValue({'ghiChu': res.data.ghiChu});
             
       	    this.myForm.patchValue({'active': res.data.active});
             
       	    this.myForm.patchValue({'cQCS_Ten': res.data.cQCS_Ten});
             
       	    this.myForm.patchValue({'cQCS_DiaChi': res.data.cQCS_DiaChi});
             
       	    this.myForm.patchValue({'cQCS_DienThoai': res.data.cQCS_DienThoai});
             
       	    this.myForm.patchValue({'cQCS_HomThu': res.data.cQCS_HomThu});
             
       	    this.myForm.patchValue({'cQCS_ThuTruong': res.data.cQCS_ThuTruong});
             
       	    this.myForm.patchValue({'cQCS_ThuTruongChucVu': res.data.cQCS_ThuTruongChucVu});
             
       	    this.myForm.patchValue({'cQCS_NguoiPhuTrach': res.data.cQCS_NguoiPhuTrach});
             
       	    this.myForm.patchValue({'cQCS_NguoiPhuTrachPhone': res.data.cQCS_NguoiPhuTrachPhone});
             
	  
      });
    }
	else{
		this.myForm.patchValue({'donViId': data.id});
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
    const submitData = new DonViModel();
    //submitData.donViId = this.data.donViId;
    //submitData.text = this.myForm.value.name.trim();
    this.donViService.save(this.myForm.value).subscribe((res) => {
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
