import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Subject, Observable, of, empty, observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/from';
import { delay } from 'rxjs/operators';
import { DataTableDirective } from 'angular-datatables';
import { toBase64String } from '@angular/compiler/src/output/source_map';
import { ModalService } from 'src/app/shared/services/modal.Service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ChucvuDialogComponent } from '../../chucvu-dialog/chucvu-dialog.component';
import { ChucvuAdComponent } from '../chucvu-ad/chucvu-ad.component';

@Component({
  selector: 'app-chucvu-list',
  templateUrl: './chucvu-list.component.html',
  styleUrls: []
})
export class ChucvuListComponent implements OnInit, OnChanges , OnDestroy {
  @ViewChild(DataTableDirective)
  private datatableElement: DataTableDirective;
  checkall: boolean = false;
  dtOptions: DataTables.Settings = {};
  list$: any[] = [];
  private modalRef: BsModalRef;
  dtTrigger: Subject<any> = new Subject();
  modalDataResult: any;
  constructor(private http: HttpClient, private modalService:ModalService) { 
    this.modalService.data.subscribe(result=>{
      //console.log(result);
      //do somthing when data change
    });
  }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'simple_numbers',
      // pageLength: 2,

      searching: false,
      serverSide: true,
      processing: true,
      columnDefs: [{
        targets: 0,
        defaultContent: '',
        width: '20px',
        orderable: false
      },

      ],

      // select: {
      //   style: 'os',
      //   selector: 'td:first-child'
      // },
      dom: 't<l<".col-lg-8 float-right"ip>>',
      order: [[ 1, 'asc' ]],
      ajax: (dataTableParameters: any, callback) => {
        console.log(dataTableParameters);
        this.getUsers().subscribe(users => {

          this.list$ = users;
          this.checkall = false;
          callback({
            recordsTotal: 10,
            recordsFiltered: 100,
            data: []// this.users$,

          });

        });

      },
      rowCallback: ( row: Node, data: any, index: number) => {
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          debugger;
          this.datatableElement.dtInstance.then((tbInstant: DataTables.Api) => {
           console.log( tbInstant.rows(".selected").data().length) ;
          });
        });
        return row;
      }




      // processing: true
    };
    setTimeout(() => {
      (this.datatableElement.dtInstance).then((dtInstant: DataTables.Api) => {
        console.log(dtInstant);
      });
    }, 500);

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  openModal(){
    //change data to child component
    this.modalService.changeDataSource({nam:'quyenth' + new Date().getMilliseconds()});
    this.modalRef = this.modalService.openModalWithComponent(ChucvuAdComponent);
    
  }

  getUsers(): Observable<any> {
    console.log("get users");
    var users = [
      {
        name: "quyenth",
        email: "thai hong quyen"
      },
      {
        name: "quyenth1",
        email: "thai hong quyen"
      },
      {
        name: "quyenth2",
        email: "thai hong quyen"
      },
      {
        name: "quyenth",
        email: "thai hong quyen"
      }
    ];
    return of(users).pipe(delay(100));
  };

  onCheckAllChange(){
    console.log("change");
    this.list$.map(c => {
      c.selected = this.checkall;
    });
  }

  onCheckOneChange() {
    if ( this.list$.length === this.list$.filter(c => c.selected === true).length ) {
      this.checkall = true;
    } else {
      this.checkall = false;
    }
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
