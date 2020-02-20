import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { GetDataService } from 'src/app/_services/get-data.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormArray, FormControl } from '@angular/forms';

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
  fCount = 0;

  // @HostListener('window:scroll')
  // // В случае скрола выполняем функцию
  // onWindowScroll() {
  //   // Сравниваем прокрученный экран и высоту экрана
  //   if (window.scrollY + window.innerHeight >= window.document.body.offsetHeight) {
  //     console.log(this.selectedFilters);
  //     this.requestData();
  //   }
  // }

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
    console.log(this.filtersForm);
    this.selectedFilters.length = 0;
    // this.fCount = 0;
    // this.getDataServ.clearContent();
    for (let i = 0; i < this.filters.length; i++) {
      if (filters[i]) {
        this.selectedFilters.push(this.filters[i]);
      }
    }
    // console.log(this.selectedFilters);
    this.getDataServ.setFilters(this.selectedFilters);
    this.getDataServ.requestData();
    // this.requestData();
  }

  // requestData() {
  //   if (this.selectedFilters.length !== 0) {
  //     this.getDataServ.requestData(this.selectedFilters.shift(), this.fCount++);
  //   }
  // }

  ngOnDestroy(): void {
    this.filterSubs.unsubscribe();
  }

}
