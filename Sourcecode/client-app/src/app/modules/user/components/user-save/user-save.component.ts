import { map, switchMap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subscription, timer, of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { ActionType } from 'src/app/shared/commons/action-type';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from 'src/app/modules/register/register.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { AuthService } from 'src/app/shared/services/auth.Service';


@Component({
  selector: 'app-user-save',
  templateUrl: './user-save.component.html'
})
export class UserSaveComponent implements OnInit , OnDestroy {

  @ViewChild('submitSwal') private submitSwal: SwalComponent;

  isUpdate: boolean;
  subscription: Subscription;
  submited: boolean;
  myForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.maxLength(30), Validators.email], [this.validateCodeUnique.bind(this)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rePassword: ['', [Validators.required, Validators.minLength(6), this.checkPassMatch.bind(this)]]

  });
  constructor(public bsModalRef: BsModalRef, private registerService: RegisterService,
            private fb: FormBuilder, private modalService: ModalService ,
           private spinner: NgxSpinnerService,
          private authService: AuthService, private toastr: ToastrService) {

  }

  ngOnInit() {

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

    this.authService.register(this.myForm.get('email').value , this.myForm.get('password').value , this.myForm.get('fullName').value)
        .subscribe((res) => {
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

  checkPassMatch (control: FormControl) {
    if ( control.value && this.myForm.get('password').value && control.value !== this.myForm.get('password').value) {
         return {'passNotMatch' : true};
    }

    return null;
 }

 ngOnDestroy(): void {
   this.subscription.unsubscribe();
 }

 validateCodeUnique(control: FormControl) {
   return timer(800).pipe(
     switchMap(() => {
       if (!control.value) {
         return of(null);
       }
       return this.registerService.checkEmailIsInUse( control.value.trim())
       .pipe(map((res) => {
            if (res.data) {
              return {'emailDuplicate' : true};
            }
            return null;
       }));
     })
   );
 }



}
