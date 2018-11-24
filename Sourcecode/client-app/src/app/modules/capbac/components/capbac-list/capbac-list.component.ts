import { HttpResult } from './../../../../shared/commons/http-result';
import { CapbacService } from './../../../../https/capbac.service';
import { Component, OnInit } from '@angular/core';
import { CapBac } from 'src/app/shared/models/cap-bac.model';
import { FilterCondition } from 'src/app/shared/models/filter-condition';

@Component({
  selector: 'app-capbac-list',
  templateUrl: './capbac-list.component.html',
  styleUrls: ['./capbac-list.component.css']
})
export class CapbacListComponent implements OnInit {
  data: CapBac[] = [];
  filterCondition: FilterCondition;
  constructor(private capbacService: CapbacService) { }

  ngOnInit() {
    this.capbacService.search(this.filterCondition).subscribe((res: HttpResult) => {
      this.data = res.Data;
    });
  }

  search () {
    this.capbacService.search(this.filterCondition).subscribe((res: HttpResult) => {
      this.data = res.Data;
    });
  }
}
