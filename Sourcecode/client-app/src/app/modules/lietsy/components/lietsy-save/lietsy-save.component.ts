import { map, switchMap } from 'rxjs/operators';
import { LietSyModel } from './../../lietsy.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subscription, timer, of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { ActionType } from 'src/app/shared/commons/action-type';
import { LietSyService } from './../../lietsy.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmDialog.service';
import { FromType } from 'src/app/shared/commons/form-type';

@Component({
  selector: 'app-lietSy-save',
  templateUrl: './lietsy-save.component.html'
})
export class LietSySaveComponent implements OnInit , OnDestroy {

  subscription: Subscription;
  submited: boolean;
  data: LietSyModel = new LietSyModel();
  myForm = this.fb.group({
   //name: ['', [Validators.required, Validators.maxLength(30)] , this.validateNameUnique.bind(this)]

   	    id: [''],
         
   	    thuTu: [''],
         
   	    soGoSo: [''],
         
   	    soQuyen: [''],
         
   	    hoTen: [''],
         
   	    ten: [''],
         
   	    tenKhac: [''],
         
   	    biDanh: [''],
         
   	    gioiTinh: [''],
         
   	    namSinh: [''],
         
   	    danToc: [''],
         
   	    quocTich: [''],
         
   	    queThon: [''],
         
   	    queXaId: [''],
         
   	    queHuyenId: [''],
         
   	    queTinhId: [''],
         
   	    truQuanThon: [''],
         
   	    truQuanXaId: [''],
         
   	    truQuanHuyenId: [''],
         
   	    truQuanTinhId: [''],
         
   	    diaPhuongNhapNgu: [''],
         
   	    ngayNhapNgu: [''],
         
   	    ngayXuatNgu: [''],
         
   	    ngayTaiNgu: [''],
         
   	    ngayDiBCK: [''],
         
   	    donViHuanLuyen: [''],
         
   	    doanVien: [''],
         
   	    ngayVaoDoan: [''],
         
   	    dangVien: [''],
         
   	    ngayVaoDang: [''],
         
   	    khenThuong: [''],
         
   	    ngayHiSinh: [''],
         
   	    hiSinhLyDoID: [''],
         
   	    hySinhLyDoChiTiet: [''],
         
   	    hySinhThoiKyId: [''],
         
   	    doiTuongId: [''],
         
   	    hySinhMatTranId: [''],
         
   	    hySinhTranDanh: [''],
         
   	    hySinhDiaDiem: [''],
         
   	    hySinhXaId: [''],
         
   	    hySinhHuyenId: [''],
         
   	    hySinhTinhId: [''],
         
   	    maiTangXaId: [''],
         
   	    maiTangHuyenId: [''],
         
   	    maiTangTinhId: [''],
         
   	    maiTangBanDo: [''],
         
   	    maiTangToaDo: [''],
         
   	    maiTangDiemCaoId: [''],
         
   	    nghiaTrang: [''],
         
   	    viTriMo: [''],
         
   	    quyTap: [''],
         
   	    maiTang: [''],
         
   	    matThiHai: [''],
         
   	    matTich: [''],
         
   	    ngayBaoTu: [''],
         
   	    giayBaoTu: [''],
         
   	    thanNhanCha: [''],
         
   	    thanNhanMe: [''],
         
   	    thanNhanVo: [''],
         
   	    thanNhanCon: [''],
         
   	    thanNhanKhac: [''],
         
   	    thanNhanBaoTin: [''],
         
   	    thanNhanDiaChi: [''],
         
   	    ngayCapBangTQGC: [''],
         
   	    soBangTQGC: [''],
         
   	    donViLuuTruId: [''],
         
   	    donViQuanLyId: [''],
         
   	    hySinhDonVi: [''],
         
   	    donVi_B_C_D: [''],
         
   	    donVi_E: [''],
         
   	    donVi_F: [''],
         
   	    donVi_G: [''],
         
   	    homThuDonVi: [''],
         
   	    hySinhCapBac: [''],
         
   	    hySinhChucVu: [''],
         
   	    ghiChu: [''],
         
   	    active: [''],
         
   	    created: [''],
         
   	    creatdedBy: [''],
         
   	    updated: [''],
         
   	    updatedBy: [''],
         
  });

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private modalService: ModalService ,
          private lietSyService: LietSyService, private spinner: NgxSpinnerService,
          private confirmationDialogService: ConfirmationDialogService) {
    this.subscription = this.modalService.dialogData.subscribe(data => {
      this.data.id = data.id;
      this.getDataByID(data);
    });
  }

  ngOnInit() {

  }

  getDataByID (data) {
    if (data.formType === FromType.UPDATE) {
      this.lietSyService.getById(this.data.id).subscribe((res) => {

       	    this.myForm.patchValue({'id': res.data.id});
             
       	    this.myForm.patchValue({'thuTu': res.data.thuTu});
             
       	    this.myForm.patchValue({'soGoSo': res.data.soGoSo});
             
       	    this.myForm.patchValue({'soQuyen': res.data.soQuyen});
             
       	    this.myForm.patchValue({'hoTen': res.data.hoTen});
             
       	    this.myForm.patchValue({'ten': res.data.ten});
             
       	    this.myForm.patchValue({'tenKhac': res.data.tenKhac});
             
       	    this.myForm.patchValue({'biDanh': res.data.biDanh});
             
       	    this.myForm.patchValue({'gioiTinh': res.data.gioiTinh});
             
       	    this.myForm.patchValue({'namSinh': res.data.namSinh});
             
       	    this.myForm.patchValue({'danToc': res.data.danToc});
             
       	    this.myForm.patchValue({'quocTich': res.data.quocTich});
             
       	    this.myForm.patchValue({'queThon': res.data.queThon});
             
       	    this.myForm.patchValue({'queXaId': res.data.queXaId});
             
       	    this.myForm.patchValue({'queHuyenId': res.data.queHuyenId});
             
       	    this.myForm.patchValue({'queTinhId': res.data.queTinhId});
             
       	    this.myForm.patchValue({'truQuanThon': res.data.truQuanThon});
             
       	    this.myForm.patchValue({'truQuanXaId': res.data.truQuanXaId});
             
       	    this.myForm.patchValue({'truQuanHuyenId': res.data.truQuanHuyenId});
             
       	    this.myForm.patchValue({'truQuanTinhId': res.data.truQuanTinhId});
             
       	    this.myForm.patchValue({'diaPhuongNhapNgu': res.data.diaPhuongNhapNgu});
             
       	    this.myForm.patchValue({'ngayNhapNgu': res.data.ngayNhapNgu});
             
       	    this.myForm.patchValue({'ngayXuatNgu': res.data.ngayXuatNgu});
             
       	    this.myForm.patchValue({'ngayTaiNgu': res.data.ngayTaiNgu});
             
       	    this.myForm.patchValue({'ngayDiBCK': res.data.ngayDiBCK});
             
       	    this.myForm.patchValue({'donViHuanLuyen': res.data.donViHuanLuyen});
             
       	    this.myForm.patchValue({'doanVien': res.data.doanVien});
             
       	    this.myForm.patchValue({'ngayVaoDoan': res.data.ngayVaoDoan});
             
       	    this.myForm.patchValue({'dangVien': res.data.dangVien});
             
       	    this.myForm.patchValue({'ngayVaoDang': res.data.ngayVaoDang});
             
       	    this.myForm.patchValue({'khenThuong': res.data.khenThuong});
             
       	    this.myForm.patchValue({'ngayHiSinh': res.data.ngayHiSinh});
             
       	    this.myForm.patchValue({'hiSinhLyDoID': res.data.hiSinhLyDoID});
             
       	    this.myForm.patchValue({'hySinhLyDoChiTiet': res.data.hySinhLyDoChiTiet});
             
       	    this.myForm.patchValue({'hySinhThoiKyId': res.data.hySinhThoiKyId});
             
       	    this.myForm.patchValue({'doiTuongId': res.data.doiTuongId});
             
       	    this.myForm.patchValue({'hySinhMatTranId': res.data.hySinhMatTranId});
             
       	    this.myForm.patchValue({'hySinhTranDanh': res.data.hySinhTranDanh});
             
       	    this.myForm.patchValue({'hySinhDiaDiem': res.data.hySinhDiaDiem});
             
       	    this.myForm.patchValue({'hySinhXaId': res.data.hySinhXaId});
             
       	    this.myForm.patchValue({'hySinhHuyenId': res.data.hySinhHuyenId});
             
       	    this.myForm.patchValue({'hySinhTinhId': res.data.hySinhTinhId});
             
       	    this.myForm.patchValue({'maiTangXaId': res.data.maiTangXaId});
             
       	    this.myForm.patchValue({'maiTangHuyenId': res.data.maiTangHuyenId});
             
       	    this.myForm.patchValue({'maiTangTinhId': res.data.maiTangTinhId});
             
       	    this.myForm.patchValue({'maiTangBanDo': res.data.maiTangBanDo});
             
       	    this.myForm.patchValue({'maiTangToaDo': res.data.maiTangToaDo});
             
       	    this.myForm.patchValue({'maiTangDiemCaoId': res.data.maiTangDiemCaoId});
             
       	    this.myForm.patchValue({'nghiaTrang': res.data.nghiaTrang});
             
       	    this.myForm.patchValue({'viTriMo': res.data.viTriMo});
             
       	    this.myForm.patchValue({'quyTap': res.data.quyTap});
             
       	    this.myForm.patchValue({'maiTang': res.data.maiTang});
             
       	    this.myForm.patchValue({'matThiHai': res.data.matThiHai});
             
       	    this.myForm.patchValue({'matTich': res.data.matTich});
             
       	    this.myForm.patchValue({'ngayBaoTu': res.data.ngayBaoTu});
             
       	    this.myForm.patchValue({'giayBaoTu': res.data.giayBaoTu});
             
       	    this.myForm.patchValue({'thanNhanCha': res.data.thanNhanCha});
             
       	    this.myForm.patchValue({'thanNhanMe': res.data.thanNhanMe});
             
       	    this.myForm.patchValue({'thanNhanVo': res.data.thanNhanVo});
             
       	    this.myForm.patchValue({'thanNhanCon': res.data.thanNhanCon});
             
       	    this.myForm.patchValue({'thanNhanKhac': res.data.thanNhanKhac});
             
       	    this.myForm.patchValue({'thanNhanBaoTin': res.data.thanNhanBaoTin});
             
       	    this.myForm.patchValue({'thanNhanDiaChi': res.data.thanNhanDiaChi});
             
       	    this.myForm.patchValue({'ngayCapBangTQGC': res.data.ngayCapBangTQGC});
             
       	    this.myForm.patchValue({'soBangTQGC': res.data.soBangTQGC});
             
       	    this.myForm.patchValue({'donViLuuTruId': res.data.donViLuuTruId});
             
       	    this.myForm.patchValue({'donViQuanLyId': res.data.donViQuanLyId});
             
       	    this.myForm.patchValue({'hySinhDonVi': res.data.hySinhDonVi});
             
       	    this.myForm.patchValue({'donVi_B_C_D': res.data.donVi_B_C_D});
             
       	    this.myForm.patchValue({'donVi_E': res.data.donVi_E});
             
       	    this.myForm.patchValue({'donVi_F': res.data.donVi_F});
             
       	    this.myForm.patchValue({'donVi_G': res.data.donVi_G});
             
       	    this.myForm.patchValue({'homThuDonVi': res.data.homThuDonVi});
             
       	    this.myForm.patchValue({'hySinhCapBac': res.data.hySinhCapBac});
             
       	    this.myForm.patchValue({'hySinhChucVu': res.data.hySinhChucVu});
             
       	    this.myForm.patchValue({'ghiChu': res.data.ghiChu});
             
       	    this.myForm.patchValue({'active': res.data.active});
             
       	    this.myForm.patchValue({'created': res.data.created});
             
       	    this.myForm.patchValue({'creatdedBy': res.data.creatdedBy});
             
       	    this.myForm.patchValue({'updated': res.data.updated});
             
       	    this.myForm.patchValue({'updatedBy': res.data.updatedBy});
             
	  
      });
    }
	else{
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
    const submitData = new LietSyModel();
    //submitData.id = this.data.id;
    //submitData.text = this.myForm.value.name.trim();
    this.lietSyService.save(this.myForm.value).subscribe((res) => {
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