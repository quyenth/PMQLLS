import { map, switchMap } from 'rxjs/operators';
import { DonViModel } from './../../donvi.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subscription, timer, of, Observable } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { ActionType } from 'src/app/shared/commons/action-type';
import { DonViService } from './../../donvi.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmDialog.service';
import { FromType } from 'src/app/shared/commons/form-type';
import { ToastrService } from 'ngx-toastr';
import { DonViSelectModel } from '../../DonViSelectModel';
import { ChucVuService } from './../../../chucvu/chucvu.service';
import { Select2Model } from 'src/app/shared/models/select2.model';


@Component({
  selector: 'app-don-vi-save',
  templateUrl: './donvi-save.component.html'
})
export class DonViSaveComponent implements OnInit , OnDestroy {

  subscription: Subscription;
  submited: boolean;
  isUpdate: boolean;
  data: DonViModel = new DonViModel();
  listAllChucVu: Observable<Select2Model[]>;
  ListAllDonVI: DonViSelectModel[];

  myForm = this.fb.group({

   	    donViId: [''],

   	    maDonVi: ['', [Validators.required , Validators.maxLength(30)] , [this.validateCodeUnique.bind(this)]],

   	    tenDonVi: ['', [Validators.required], [this.validateNameUnique.bind(this)]],

   	    tenVietTat: ['', [Validators.required]],

   	    maDonViCha: [null, ],

   	    // phanMuc: [0, ],

   	    // phanCap: ['', ],

   	    // phanKhoi: [''],

   	    ghiChu: [''],

   	    active: [''],

   	    // cqcS_Ten: ['', ],

   	    cqcS_DiaChi: ['',],

   	    // cqcS_DienThoai: ['',],

   	    // cqcS_HomThu: ['', ],

   	    cqcS_ThuTruong: ['', ],

   	    cqcS_ThuTruongChucVu: [null, ],

   	    // cqcS_NguoiPhuTrach: ['', ],

   	    // cqcS_NguoiPhuTrachPhone: ['',],

  });

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private modalService: ModalService ,
          private donViService: DonViService, private spinner: NgxSpinnerService, private chucVuService: ChucVuService,
          private confirmationDialogService: ConfirmationDialogService, private toastr: ToastrService) {
    this.subscription = this.modalService.dialogData.subscribe(data => {
      this.data.donViId = data.id;
      this.getDataByID(data);
    });
  }

  ngOnInit() {
      this.donViService.getListAllDonVi().subscribe(res => {
        this.ListAllDonVI = res;
      });
      this.listAllChucVu = this.chucVuService.getListAllChucVu();
  }

  getDataByID (data) {
    if (data.formType === FromType.UPDATE) {
	  this.isUpdate = true;
      this.donViService.getById(this.data.donViId).subscribe((res) => {

       	    this.myForm.patchValue({'donViId': res.data.donViId});

       	    this.myForm.patchValue({'maDonVi': res.data.maDonVi});

       	    this.myForm.patchValue({'tenDonVi': res.data.tenDonVi});

       	    this.myForm.patchValue({'tenVietTat': res.data.tenVietTat});

       	    this.myForm.patchValue({'maDonViCha': res.data.maDonViCha});

       	    // this.myForm.patchValue({'phanMuc': res.data.phanMuc});

       	    // this.myForm.patchValue({'phanCap': res.data.phanCap});

       	    // this.myForm.patchValue({'phanKhoi': res.data.phanKhoi});

       	    this.myForm.patchValue({'ghiChu': res.data.ghiChu});

       	    this.myForm.patchValue({'active': res.data.active});

       	    // this.myForm.patchValue({'cqcS_Ten': res.data.cqcS_Ten});

       	    this.myForm.patchValue({'cqcS_DiaChi': res.data.cqcS_DiaChi});

       	    // this.myForm.patchValue({'cqcS_DienThoai': res.data.cqcS_DienThoai});

       	    // this.myForm.patchValue({'cqcS_HomThu': res.data.cqcS_HomThu});

       	    this.myForm.patchValue({'cqcS_ThuTruong': res.data.cqcS_ThuTruong});

       	    this.myForm.patchValue({'cqcS_ThuTruongChucVu': res.data.cqcS_ThuTruongChucVu});

       	    // this.myForm.patchValue({'cqcS_NguoiPhuTrach': res.data.cqcS_NguoiPhuTrach});

       	    // this.myForm.patchValue({'cqcS_NguoiPhuTrachPhone': res.data.cqcS_NguoiPhuTrachPhone});


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

    this.donViService.save(this.myForm.value).subscribe((res) => {
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

  validateCodeUnique(control: FormControl) {
    return timer(800).pipe(
      switchMap(() => {
        if (!control.value) {
          return of(null);
        }
        return this.donViService.checkCodeIsUnique(this.data.donViId, control.value.trim())
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
        return this.donViService.checkNameIsUnique(this.data.donViId, control.value.trim())
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
