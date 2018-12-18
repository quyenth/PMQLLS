import { map, switchMap } from 'rxjs/operators';
import { Ncc_PhieuCungCapModel } from './../../ncc_phieucungcap.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subscription, timer, of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { ActionType } from 'src/app/shared/commons/action-type';
import { PhieuCungCapService } from './../../ncc_phieucungcap.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmDialog.service';
import { FromType } from 'src/app/shared/commons/form-type';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-phieu-cung-cap-save',
  templateUrl: './ncc_phieucungcap-save.component.html'
})
export class PhieuCungCapSaveComponent implements OnInit , OnDestroy {

  subscription: Subscription;
  submited: boolean;
  isUpdate: boolean;
  data: Ncc_PhieuCungCapModel = new Ncc_PhieuCungCapModel();
  myForm = this.fb.group({

        id: [''],

        donViId: [''],

        ncc_HoTen: [''],

        ncc_NamSinh: [''],

        ncc_QueXa: [''],

        ncc_QueHuyen: [''],

        ncc_QueTinh: [''],

        ncc_LiemHe: [''],

        ncc_BanThan: [''],

        ncc_LienHeVoiLietSi: [''],

        ncc_DonVi: [''],

        ncc_KienNghi: [''],

        lietSiHoTien: [''],

        lietSyQueThon: [''],

        lietSyQueXa: [''],

        lietSyQueHuyen: [''],

        lietSyQueTinh: [''],

        lietSyCapBac: [''],

        letSyChucVu: [''],

        lietSyDonVi: [''],

        lietSyNgayHySinh: [''],

        lietSyDacDiem: [''],

        lietSyMaiTang: [''],

        lietSyMaiTangXa: [''],

        lietSyMaiTangHuyen: [''],

        lietSyMaiTangTinh: [''],

        lietSyToaDo: [''],

        lieSySoDoViTri: [''],

        lietSyLyDoBietMo: [''],

        nguoiBietKhac: [''],

        nguoiBietKhacLienHe: [''],

  });

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private modalService: ModalService ,
          private ncc_PhieuCungCapService: PhieuCungCapService, private spinner: NgxSpinnerService,
          private confirmationDialogService: ConfirmationDialogService, private toastr: ToastrService) {
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
      this.ncc_PhieuCungCapService.getById(this.data.id).subscribe((res) => {

            this.myForm.patchValue({'id': res.data.id});

            this.myForm.patchValue({'donViId': res.data.donViId});

            this.myForm.patchValue({'ncc_HoTen': res.data.ncc_HoTen});

            this.myForm.patchValue({'ncc_NamSinh': res.data.ncc_NamSinh});

            this.myForm.patchValue({'ncc_QueXa': res.data.ncc_QueXa});

            this.myForm.patchValue({'ncc_QueHuyen': res.data.ncc_QueHuyen});

            this.myForm.patchValue({'ncc_QueTinh': res.data.ncc_QueTinh});

            this.myForm.patchValue({'ncc_LiemHe': res.data.ncc_LiemHe});

            this.myForm.patchValue({'ncc_BanThan': res.data.ncc_BanThan});

            this.myForm.patchValue({'ncc_LienHeVoiLietSi': res.data.ncc_LienHeVoiLietSi});

            this.myForm.patchValue({'ncc_DonVi': res.data.ncc_DonVi});

            this.myForm.patchValue({'ncc_KienNghi': res.data.ncc_KienNghi});

            this.myForm.patchValue({'lietSiHoTien': res.data.lietSiHoTien});

            this.myForm.patchValue({'lietSyQueThon': res.data.lietSyQueThon});

            this.myForm.patchValue({'lietSyQueXa': res.data.lietSyQueXa});

            this.myForm.patchValue({'lietSyQueHuyen': res.data.lietSyQueHuyen});

            this.myForm.patchValue({'lietSyQueTinh': res.data.lietSyQueTinh});

            this.myForm.patchValue({'lietSyCapBac': res.data.lietSyCapBac});

            this.myForm.patchValue({'letSyChucVu': res.data.letSyChucVu});

            this.myForm.patchValue({'lietSyDonVi': res.data.lietSyDonVi});

            this.myForm.patchValue({'lietSyNgayHySinh': res.data.lietSyNgayHySinh});

            this.myForm.patchValue({'lietSyDacDiem': res.data.lietSyDacDiem});

            this.myForm.patchValue({'lietSyMaiTang': res.data.lietSyMaiTang});

            this.myForm.patchValue({'lietSyMaiTangXa': res.data.lietSyMaiTangXa});

            this.myForm.patchValue({'lietSyMaiTangHuyen': res.data.lietSyMaiTangHuyen});

            this.myForm.patchValue({'lietSyMaiTangTinh': res.data.lietSyMaiTangTinh});

            this.myForm.patchValue({'lietSyToaDo': res.data.lietSyToaDo});

            this.myForm.patchValue({'lieSySoDoViTri': res.data.lieSySoDoViTri});

            this.myForm.patchValue({'lietSyLyDoBietMo': res.data.lietSyLyDoBietMo});

            this.myForm.patchValue({'nguoiBietKhac': res.data.nguoiBietKhac});

            this.myForm.patchValue({'nguoiBietKhacLienHe': res.data.nguoiBietKhacLienHe});


      });
    } 	else {
      this.myForm.patchValue({'id': data.id});
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
    const submitData = new Ncc_PhieuCungCapModel();
    this.ncc_PhieuCungCapService.save(this.myForm.value).subscribe((res) => {
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
