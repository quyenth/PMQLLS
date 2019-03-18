import { RoleService } from './../../../role/role.service';
import { map, switchMap } from 'rxjs/operators';
import { UserRolesModel } from '../../user_role.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
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
import { SwalComponent } from '@toverux/ngx-sweetalert2';


@Component({
  selector: 'app-user-roles-save',
  templateUrl: './user_roles-save.component.html'
})
export class UserRolesSaveComponent implements OnInit , OnDestroy {

  @ViewChild('submitSwal') private submitSwal: SwalComponent;

  subscription: Subscription;
  submited: boolean;
  isUpdate: boolean;
  data: UserRolesModel = new UserRolesModel();
  listAllRole: Select2Model[];
  listAllTinh: Observable<Select2Model[]>;
  listAllUser: Observable<Select2Model[]>;
  myForm = this.fb.group({
        userId: ['', [Validators.required]],
        roleId: [''],
        tinhId: ['']

  });
  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private modalService: ModalService ,
          private userRolesService: UserRolesService, private spinner: NgxSpinnerService,
           private toastr: ToastrService ,
          private roleService: RoleService , private tinhService: TinhService) {
    this.subscription = this.modalService.dialogData.subscribe(data => {
      this.data.userId = data.id;
      this.data.roleText = data.RoleText;
      this.data.roleId = data.roleId;
      if (data.roleId) {
        this.myForm.patchValue({'roleId': data.roleId});
      }
      this.getDataByID(data);
    });
  }

  ngOnInit() {
     this.roleService.getAllRole().subscribe(res => {
      this.listAllRole = res;
     });
     this.listAllUser = this.userRolesService.getAllUser();
     this.listAllTinh = this.tinhService.getListAllTinh();
  }

  getDataByID (data) {
    if (data.formType === FromType.UPDATE) {
      this.isUpdate = true;
      this.userRolesService.getById(this.data.userId, this.data.roleId).subscribe((res) => {

            this.myForm.patchValue({'userId': this.data.userId});
            this.myForm.patchValue({'roleId': this.data.roleId});

            if ( res.data && res.data.tinhId) {
                const array = res.data.tinhId.split(',');
                this.myForm.patchValue({'tinhId': array.map(item => +item)});
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

    this.submitSwal.show();
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

  onSelectRoleChange() {
      const roleId = this.myForm.get('roleId').value;
      const role = this.listAllRole.find(c => c.id === roleId) ;
      if(role != null) {
        this.data.roleText = role.text;
      }
  }

}
