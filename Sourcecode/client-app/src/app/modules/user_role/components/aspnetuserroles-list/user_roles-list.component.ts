import { ModalType } from '../../../../shared/commons/modal-type';
import { HttpResult } from '../../../../shared/commons/http-result';
import { UserRolesService } from '../../user_role.service';
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
import { UserRolesSaveComponent } from '../aspnetuserroles-save/user_roles-save.component';
import { Select2Model } from 'src/app/shared/models/select2.model';
import { RoleService } from 'src/app/modules/role/role.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';


@Component({
  selector: 'app-user-roles-list',
  templateUrl: './user_roles-list.component.html'
})
export class UserRolesListComponent implements OnInit, OnDestroy {
  @ViewChild('deleteItemSwal') private deleteItemSwal: SwalComponent;


  currentPage = 1;
  pageSize = 10;

  list$ = [];
  totalCount: number;
  filterCondition: FilterCondition = new FilterCondition();
  orderInfo: OrderInfo = new OrderInfo('', true);
  listAllRole: Select2Model[];
  listAllUser: Observable<Select2Model[]>;
  searchUser = [];
  searchRole = null;
  subscription: Subscription;
  checkall = false;
  constructor(private userRolesService: UserRolesService, private modalService: ModalService,
      private spinner: NgxSpinnerService, private confirmationDialogService: ConfirmationDialogService,
      private toastr: ToastrService , private roleService: RoleService) { }

  ngOnInit() {
    this.subscription = this.modalService.parentData.subscribe(data => {
      if ( data && data.action === ActionType.SUBMIT) {
        this.onSearch();
      }
    });
    this.filterCondition.Paging = true;
    this.filterCondition.PageIndex = this.currentPage;
    this.filterCondition.PageSize = this.pageSize;

    this.filterCondition.Orders = [ ];
    // this.onSearch();
    this.roleService.getAllRole().subscribe(data => {
      this.listAllRole = data ;
      if ( this.listAllRole != null && this.listAllRole.length > 0) {
          this.searchRole = this.listAllRole[0].id;
      }
      this.onSearch();
    });
    this.listAllUser = this.userRolesService.getAllUser();

  }

  onSearch (pageIndex: number = 1) {
      this.spinner.show();
      this.filterCondition.SearchCondition = [ ];
      this.filterCondition.PageIndex = pageIndex;
      this.currentPage = pageIndex;

      this.userRolesService.search(this.searchUser.toString(), this.searchRole ,
            this.filterCondition.PageIndex , this.filterCondition.PageSize).subscribe((res: HttpResult) => {
        this.spinner.hide();
        this.list$ = res.data.list;
        this.totalCount = res.data.total;
      }, (err) => {
        this.spinner.hide();
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
    const role = this.listAllRole.find(item => {
      return item.id === this.searchRole;
    });
    let RoleText = '';
    if (role) {
      RoleText = role.text;
    }
    this.modalService.openModalWithComponent(UserRolesSaveComponent,
        { formType: FromType.INSERT, id: 0 , RoleText: RoleText , roleId : this.searchRole} , ModalSize.LARGE);
  }

  onEditItem(item) {
    const role = this.listAllRole.find(item => {
      return item.id === this.searchRole;
    });
    let RoleText = '';
    if (role) {
      RoleText = role.text;
    }
    this.modalService.openModalWithComponent(UserRolesSaveComponent,
      { formType: FromType.UPDATE, id: item.id , RoleText: RoleText , roleId : this.searchRole} , ModalSize.LARGE);
  }

  onDeleteItem (item) {
    this.deleteItemSwal.text = 'Bạn thực sự muốn xóa?' ;
    this.deleteItemSwal.show().then( (result) => {
            if ( result.value ) {
              this.userRolesService.delete(item).subscribe((res) => {
                this.toastr.success('Xóa thành công!');
                  this.onSearch();
              });
            }
        }
    );
  }

  onDeleteSelected () {
    const listSelected = this.list$.filter(c => c.selected === true);
    if (listSelected.length === 0) {
        this.confirmationDialogService.confirm('Thông tin!', 'Bạn chưa chọn mục nào?' , ModalType.INFO);
        return;
    }

    this.deleteItemSwal.text = 'Bạn thực sự muốn xóa các mục đã chọn?' ;
    this.deleteItemSwal.show().then( (result) => {
            if ( result.value ) {
              this.userRolesService.delectList(listSelected).subscribe((res) => {
                this.toastr.success('Xóa thành công!');
                  this.onSearch();
              });
            }
        }
    );

  }
  onAddNewUser () {

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
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
