import { ModalType } from './../../../../shared/commons/modal-type';
import { LietSySaveComponent } from './../lietsy-save/lietsy-save.component';
import { HttpResult } from './../../../../shared/commons/http-result';
import { LietSyService } from './../../lietsy.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FilterCondition } from 'src/app/shared/models/filter-condition';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { FromType } from 'src/app/shared/commons/form-type';
import { ModalSize } from 'src/app/shared/commons/modal-size';
import { OperationType } from 'src/app/shared/commons/operation-type';
import { SearchInfo } from 'src/app/shared/models/search-info';
import { ActionType } from 'src/app/shared/commons/action-type';
import { Subscription, Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmDialog.service';
import { ToastrService } from 'ngx-toastr';
import { OrderInfo } from 'src/app/shared/models/order-info';
import { Select2Model } from 'src/app/shared/models/select2.model';
import { DonViService } from 'src/app/modules/donvi/donvi.service';
import { DiemCaoService } from 'src/app/modules/diemcao/diemcao.service';
import { DoiTuongService } from 'src/app/modules/doituong/doituong.service';
import { CapbacService } from 'src/app/https/capbac.service';
import { SoQuyenService } from 'src/app/modules/soquyen/soquyen.service';
import { ThoiKyService } from 'src/app/modules/thoiky/thoiky.service';
import { ChucVuService } from 'src/app/modules/chucvu/chucvu.service';
import { StaticDataService } from 'src/app/shared/services/staticData.Service';
import { TinhService } from '../../../tinh/tinh.service';
import { HuyenService } from '../../../huyen/huyen.service';
import { XaService } from '../../../xa/xa.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-liet-sy-list',
  templateUrl: './lietsy-list.component.html'
})
export class LietSyListComponent implements OnInit, OnDestroy {

  listAllSoQuyen: Observable<Select2Model[]>;
  listAllThoiKy: Observable<Select2Model[]>;
  listAllCapBac: Observable<Select2Model[]>;
  listAllChucVu: Observable<Select2Model[]>;
  listGender: Select2Model[];

  listAllTinh: Select2Model[];
  listHuyenHySinh: Select2Model[];
  listHuyenMaiTang: Select2Model[];
  listXaHySinh: Select2Model[];
  listXaMaiTang: Select2Model[];
  listQueHuyen: Select2Model[];
  listQueXa: Select2Model[];

  @ViewChild('SearchName') searchInput: ElementRef ;
  @ViewChild('deleteItemSwal') private deleteItemSwal: SwalComponent;

  currentPage = 1;
  pageSize = 20;

  list$ = [];
  totalCount: number;
  filterCondition: FilterCondition = new FilterCondition();
  orderInfo: OrderInfo = new OrderInfo('', true);
  searchCodition = {
    soquyenId : null,
    thutu: null,
    gioiTinh: null,
    hoTen: null,
    namSinh: null,
    queTinhId: null,
    queHuyenId: null,
    queXaId: null,
    queThon: null,
    ngayHiSinh: null,
    hySinhCapBac : null,
    hySinhChucVu : null,
    hySinhLyDoChiTiet : null,
    HySinhTinhId: null,
    HySinhHuyenId: null,
    HySinhXaId: null,
    MaiTangTinhId: null,
    MaiTangHuyenId: null,
    MaiTangXaId: null
  };

  subscription: Subscription;
  checkall = false;
  constructor(private lietSyService: LietSyService, private modalService: ModalService,
      private spinner: NgxSpinnerService, private confirmationDialogService: ConfirmationDialogService, private toastr: ToastrService ,
      private donViService: DonViService , private capbacService: CapbacService , private thoiKyService: ThoiKyService
      , private diemCaoService: DiemCaoService , private soQuyenService: SoQuyenService , private chucVuService: ChucVuService
      , private doiTuongService: DoiTuongService , private staticDataService: StaticDataService, private tinhService: TinhService,
      private huyenService: HuyenService , private xaService: XaService) { }

  ngOnInit() {
    this.listAllSoQuyen = this.soQuyenService.getListAllSoQuyen();
    this.listAllThoiKy = this.thoiKyService.getListAllThoiKy();
    this.listAllCapBac = this.capbacService.getListAllCapBac();
    this.listAllChucVu = this.chucVuService.getListAllChucVu();
    this.listGender = this.staticDataService.getListGender();
    this.tinhService.getListAllTinh().subscribe((res) => {
      this.listAllTinh = res;
    });
    this.subscription = this.modalService.parentData.subscribe(data => {
      if ( data && data.action === ActionType.SUBMIT) {
        this.onSearch();
      }
    });
    this.filterCondition.Paging = true;
    this.filterCondition.PageIndex = this.currentPage;
    this.filterCondition.PageSize = this.pageSize;
    this.filterCondition.Orders = [ ];
    this.onSearch();
  }

  onSearch (pageIndex: number = 1) {
      this.spinner.show();
      const val = this.searchInput.nativeElement.value;
      this.filterCondition.SearchCondition = [ ];
      this.filterCondition.PageIndex = pageIndex;
      this.currentPage = pageIndex;

      console.log(this.searchCodition);
      const data = {
        searchCodition: this.searchCodition,
        PageIndex : pageIndex,
        PageSize: this.pageSize
      };
      this.lietSyService.search(data).subscribe((res: HttpResult) => {
        console.log(res);
        this.spinner.hide();
        this.list$ = res.data.list;
        this.totalCount = res.data.total;
      }, (err) => {
        this.spinner.hide();
      });
  }

  onExport () {
      this.lietSyService.exportExcel(this.searchCodition).subscribe(res => {
        console.log(res);
        const blob = new Blob([res], { type: 'application/ms-excel' });
        saveAs(blob, `DanhSachLietSy.xlsx`);
      });
  }

  onCheckOneChange() {
    if ( this.list$.length === this.list$.filter(c => c.selected === true).length ) {
      this.checkall = true;
    } else {
      this.checkall = false;
    }
  }

  onCheckAllChange () {
    this.list$.map(c => {
      c.selected = this.checkall;
    });
  }
  onPageSizeChange (pageSize: number) {
    this.pageSize = pageSize;
    this.filterCondition.PageSize = this.pageSize;
    this.onSearch();
  }

  goToPage (page: number) {
    this.onSearch(page);
  }


  onAddNew () {
    this.modalService.openModalWithComponent(LietSySaveComponent, { formType: FromType.INSERT, id: 0} , ModalSize.FULL);
  }

  onEditItem(item) {
    this.modalService.openModalWithComponent(LietSySaveComponent, { formType: FromType.UPDATE, id: item.id} , ModalSize.FULL);
  }

  onDeleteItem (item) {
    this.deleteItemSwal.text = 'Bạn thực sự muốn xóa?' ;
    this.deleteItemSwal.show().then( (result) => {
            if ( result.value ) {
              this.lietSyService.delete(item).subscribe((res) => {
                this.toastr.success('Xóa thành công!');
                  this.onSearch();
              });
            }
        }
    );
  }

  onDeleteSelected () {
    const listSelected = this.list$.filter(c => c.selected === true);
    this.deleteItemSwal.text = 'Bạn thực sự muốn xóa các mục đã chọn?' ;
    this.deleteItemSwal.show().then( (result) => {
      if ( result.value ) {
        this.lietSyService.delectList(listSelected).subscribe((res) => {
          this.toastr.success('Xóa thành công!');
            this.onSearch();
        });
      }
    });

  }

  onEnter() {
    this.onSearch();
  }



  reSort(text: string ) {
    console.log(text);
    if ( this.orderInfo.FieldName === text) {
      this.orderInfo.OrderDesc = !this.orderInfo.OrderDesc;
    } else {
      this.orderInfo.FieldName = text;
      this.orderInfo.OrderDesc = false;
    }
    this.onSearch();
  }

  getSelectedItems() {
    return this.list$.filter(c => c.selected === true);
  }

  onChangeTinhHySinh (item: Select2Model ) {
     this.huyenService.getListHuyenByTinh(item.id).subscribe((res) => {
        this.listHuyenHySinh = res;
     });
  }
  onChangeTinhMaiTang (item: Select2Model ) {
    this.huyenService.getListHuyenByTinh(item.id).subscribe((res) => {
      this.listHuyenMaiTang = res;
    });
  }
  onChangeHuyenHySinh (item: Select2Model ) {
    this.xaService.getListXaByHuyen(item.id).subscribe((res) => {
      this.listXaHySinh  = res;
    });
  }
  onChangeHuyenMaiTang (item: Select2Model ) {
    this.xaService.getListXaByHuyen(item.id).subscribe((res) => {
      this.listXaMaiTang = res;
    });
  }
  onChangeQueTinh (item: Select2Model ) {
    this.huyenService.getListHuyenByTinh(item.id).subscribe((res) => {
       this.listQueHuyen = res;
    });
 }
 onChangeQueHuyen (item: Select2Model ) {
  this.xaService.getListXaByHuyen(item.id).subscribe((res) => {
    this.listQueXa = res;
  });
}
  onClearTinhHySinh () {
      this.listHuyenHySinh = [];
      this.listXaHySinh = [];
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
