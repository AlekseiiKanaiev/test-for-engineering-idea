import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetDataService } from 'src/app/_services/get-data.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, OnDestroy {
  private filterSubs: Subscription;
  filtersForm: FormGroup;
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
    for (const filter of filters) {
      (this.filtersForm.controls.filters as FormArray).push(new FormControl(filter));
    }
  }

  apply(filters: Array<string | boolean>) {
    this.selectedFilters.length = 0;
    for (let i = 0; i < this.filters.length; i++) {
      if (filters[i]) {
        this.selectedFilters.push(this.filters[i]);
      }
    }
    this.getDataServ.setFilters(this.selectedFilters);
    this.getDataServ.requestData();
  }

  ngOnDestroy(): void {
    this.filterSubs.unsubscribe();
  }

}
