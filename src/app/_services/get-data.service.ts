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



  requestData(filters: string[], position: number) {
    console.log(0);
    console.log(filters);
    this.cocktailsLists.length = 0;
    console.log(this.cocktailsLists);
    filters.map(el => el.replace(' ', '_'));
    // filter.replace(' ', '_');
    for (let i = 0; i < filters.length; i++) {
      this.http.get<CocktailsData>(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters[i]}`).pipe(
        map((data: CocktailsData) => data.drinks)
      ).subscribe(
        (data: CocktailModel[]) => {
          // console.log(data);
          const list: CoctailsList = {
            category: '',
            cocktails: []
          };
          list.category = filters[i];
          list.cocktails = data;
          console.log(i, list);
          this.cocktailsLists.splice(i, 0, list);
          if (this.cocktailsLists.length === filters.length) {
            console.log(1);
            console.log(this.cocktailsLists);
            this.obsCocktailsLists.next(this.cocktailsLists);
          }
        }
      );
    }
  }
}
