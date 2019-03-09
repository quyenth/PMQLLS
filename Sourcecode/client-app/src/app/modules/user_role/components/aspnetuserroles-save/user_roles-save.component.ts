import { RoleService } from './../../../role/role.service';
import { map, switchMap } from 'rxjs/operators';
import { UserRolesModel } from '../../user_role.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subscription, timer, of, Observable } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { ActionType } from 'src/app/shared/commons/action-type';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogService } from 'src/app/shared/services/confirmDialog.service';
import { FromType } from 'src/app/shared/commons/form-type';
import { ToastrService } from 'ngx-toastr';
import { UserRolesService } from '../../user_role.service';
import { Select2Model } from 'src/app/shared/models/select2.model';
import { TinhService } from 'src/app/modules/tinh/tinh.service';


@Component({
  selector: 'app-user-roles-save',
  templateUrl: './user_roles-save.component.html'
})
export class UserRolesSaveComponent implements OnInit , OnDestroy {

  subscription: Subscription;
  submited: boolean;
  isUpdate: boolean;
  data: UserRolesModel = new UserRolesModel();
  listAllRole: Observable<Select2Model[]>;
  listAllTinh: Observable<Select2Model[]>;
  listAllUser: Observable<Select2Model[]>;
  myForm = this.fb.group({
        userId: ['', [Validators.required]],
        roleId: [''],
        tinhId: ['']

  });
  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private modalService: ModalService ,
          private userRolesService: UserRolesService, private spinner: NgxSpinnerService,
          private confirmationDialogService: ConfirmationDialogService, private toastr: ToastrService ,
          private roleService: RoleService , private tinhService: TinhService) {
    this.subscription = this.modalService.dialogData.subscribe(data => {
      console.log(data)
      this.data.userId = data.id;
      this.data.roleText = data.RoleText;
      if (data.roleId) {
        this.myForm.patchValue({'roleId': data.roleId});
      }
      this.getDataByID(data);
    });
  }

  ngOnInit() {
     this.listAllRole = this.roleService.getAllRole();
     this.listAllUser = this.userRolesService.getAllUser();
     this.listAllTinh = this.tinhService.getListAllTinh();
  }

  getDataByID (data) {
    if (data.formType === FromType.UPDATE) {
      this.isUpdate = true;
      this.userRolesService.getById(this.data.userId).subscribe((res) => {

            this.myForm.patchValue({'userId': this.data.userId});
            if ( res.data) {
              const listRole = res.data.reduce( (acc , cur ) => {
                      acc.push(cur.id);
                      return acc;
              } , []);
              this.myForm.patchValue({'roleId': listRole});

            }

      });
    } 	else {
      this.myForm.patchValue({'userId': null});
    }
  }

  onSubmit() {

    this.submited = true;
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

    this.userRolesService.save(this.myForm.value).subscribe((res) => {
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
