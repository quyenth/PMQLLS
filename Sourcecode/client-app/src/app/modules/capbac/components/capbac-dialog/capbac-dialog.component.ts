import { map, switchMap } from 'rxjs/operators';
import { CapBac } from './../../../../shared/models/cap-bac.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Subscription, timer, of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { ActionType } from 'src/app/shared/commons/action-type';
import { CapbacService } from 'src/app/https/capbac.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FromType } from 'src/app/shared/commons/form-type';
import { ToastrService } from 'ngx-toastr';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-capbac-dialog',
  templateUrl: './capbac-dialog.component.html',
  styleUrls: ['./capbac-dialog.component.css']
})
export class CapbacDialogComponent implements OnInit , OnDestroy {

  @ViewChild('submitSwal') private submitSwal: SwalComponent;

  subscription: Subscription;
  submited: boolean;
  data: CapBac = new CapBac();
  myForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(30)] , this.validateNameUnique.bind(this)],
    code: ['']
  });

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private modalService: ModalService ,
          private capbacService: CapbacService, private spinner: NgxSpinnerService,
          private toastr: ToastrService) {
    this.subscription = this.modalService.dialogData.subscribe(data => {
      this.data.capBacId = data.id;
      this.getDataByID(data);
    });
  }

  ngOnInit() {

  }

  getDataByID (data) {
    if (data.formType === FromType.UPDATE) {
      this.capbacService.getById(this.data.capBacId).subscribe((res) => {
        this.data.text = res.data.text;
        this.data.code = res.data.code;
        this.myForm.patchValue({'name': this.data.text});
        this.myForm.patchValue({'code': this.data.code});
      });
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
    const submitData = new CapBac ();
    submitData.capBacId = this.data.capBacId;
    submitData.text = this.myForm.value.name.trim();
    submitData.code = this.myForm.value.code.trim();
    this.capbacService.save(submitData).subscribe((res) => {
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

  validateNameUnique(control: FormControl) {
    return timer(800).pipe(
      switchMap(() => {
        if (!control.value) {
          return of(null);
        }
        return this.capbacService.checkNameIsUnique(this.data.capBacId, control.value.trim())
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
