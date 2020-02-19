import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetDataService } from 'src/app/_services/get-data.service';
import { Subscription } from 'rxjs';
import { NgModel, FormGroup, FormArray, FormControl } from '@angular/forms';
import { strict } from 'assert';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  filtersForm: FormGroup;
  filterSubs: Subscription;
  filters: string[];
  selectedFilters: string[] = [];

  constructor(private getDataServ: GetDataService) {
    this.filtersForm = new FormGroup({
      filters: new FormArray([])
    });
  }

  ngOnInit(): void {
    this.filterSubs = this.getDataServ.getFilters().subscribe(
      (data: string[]) => {
        this.filters = data;
        this.addFilters(this.filters);
        this.apply(this.filters);
      }
    );
  }

  addFilters(filters: string[]) {
    for (let filter of filters) {
      (this.filtersForm.controls['filters'] as FormArray).push(new FormControl(filter));
    }
  }

  apply(filters: Array<string | boolean>) {
    console.log(this.filtersForm);
    for (let i = 0; i < this.filters.length; i++) {
      if (filters[i]) {
        this.selectedFilters.push(this.filters[i]);
      }
    }
    // this.selectedFilters = this.filters.filter(el => el !== false);
    console.log(this.selectedFilters);
    this.getDataServ.requestData(this.selectedFilters);
  }

  ngOnDestroy(): void {
    this.filterSubs.unsubscribe();
  }

}
