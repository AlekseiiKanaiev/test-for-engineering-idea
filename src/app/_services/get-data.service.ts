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
    this.dataCount = 0;
    this.clearContent();
    this.filtersList = filters.map(el => el.replace(' ', '_'));
  }

  requestData() {
    if (this.dataCount < this.filtersList.length) {
      this.http.get<CocktailsData>(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${this.filtersList[this.dataCount]}`).pipe(
        map((data: CocktailsData) => data.drinks)
      ).subscribe(
        (data: CocktailModel[]) => {
          this.obsCocktailsLists.next([Object.assign({}, {category: this.filtersList[this.dataCount].replace('_', ' '), cocktails: data})]);
          this.dataCount++;
        }
      );
    }
  }

  private clearContent() {
    this.obsCocktailsLists.next([]);
  }
}
