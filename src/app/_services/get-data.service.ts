import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FiltersData } from '../_models/filter.model';
import { Subject } from 'rxjs';
import { CocktailsData, CoctailsList, CocktailModel } from '../_models/cocktailsData.model';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  obsCocktailsLists: Subject<CoctailsList[]> = new Subject<CoctailsList[]>();
  cocktailsLists: CoctailsList[] = [];
  filtersList: string[] = [];
  dataCount = 0;

  constructor(private http: HttpClient) { }

  getFilters() {
    return this.http.get<FiltersData>('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list').pipe(
      map((data: FiltersData) => data.drinks.map(el => el.strCategory))
    );
  }

  setFilters(filters: string[]) {
    console.log(filters);
    this.dataCount = 0;
    this.clearContent();
    this.filtersList = filters.map(el => el.replace(' ', '_'));
  }

  requestData() {
    console.log(0);
    // console.log(filters);
    // this.cocktailsLists.length = 0;
    // console.log(this.cocktailsLists);
    // filter.replace(' ', '_');
    console.log(this.dataCount < this.filtersList.length);
    if (this.dataCount < this.filtersList.length) {
      this.http.get<CocktailsData>(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${this.filtersList[this.dataCount]}`).pipe(
        map((data: CocktailsData) => data.drinks)
      ).subscribe(
        (data: CocktailModel[]) => {
          console.log(1);
          // this.cocktailsLists = [Object.assign({}, {category: this.filtersList[this.dataCount], cocktails: data})];
          this.obsCocktailsLists.next([Object.assign({}, {category: this.filtersList[this.dataCount].replace('_', ' '), cocktails: data})]);
          this.dataCount++;

          // console.log(this.cocktailsLists);
          // this.getData();
        }
      );
    }

    // for (let i = 0; i < this.filtersList.length; i++) {
    //   this.http.get<CocktailsData>(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${this.filtersList[i]}`).pipe(
    //     map((data: CocktailsData) => data.drinks)
    //   ).subscribe(
    //     (data: CocktailModel[]) => {
    //       // console.log(data);
    //       // const list = Object.assign({}, {category: filter, cocktails: data});
    //       // console.log(position, list);
    //       this.cocktailsLists.splice(i, 0, Object.assign({}, {category: this.filtersList[i], cocktails: data}));
    //       // if (this.cocktailsLists.length === filters.length) {
    //       console.log(1);
    //       console.log(this.cocktailsLists);
    //       this.getData();
    //       // }
    //     }
    //   );
    // }
  }

  getData() {
    this.obsCocktailsLists.next(this.cocktailsLists);
  }

  clearContent() {
    this.obsCocktailsLists.next([]);
  }
}
