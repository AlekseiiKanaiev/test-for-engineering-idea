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

  constructor(private http: HttpClient) { }

  getFilters() {
    return this.http.get<FiltersData>('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list').pipe(
      map((data: FiltersData) => data.drinks.map(el => el.strCategory))
    );
  }

  requestData(filters: string[]) {
    this.cocktailsLists.length = 0;
    filters.map(el => el.replace(' ', '_'));
    for (let filter of filters) {
      const list: CoctailsList = {
        category: '',
        cocktails: []
      };
      this.http.get<CocktailsData>(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter}`).pipe(
        map((data: CocktailsData) => data.drinks)
      ).subscribe(
        (data: CocktailModel[]) => {
          console.log(data);
          list.category = filter;
          list.cocktails = data;
          this.cocktailsLists.push(list);
          console.log(this.cocktailsLists);
          if (this.cocktailsLists.length === filters.length) {
            console.log(1);
            this.obsCocktailsLists.next(this.cocktailsLists);
          }
        }
      );
    }
  }
}
