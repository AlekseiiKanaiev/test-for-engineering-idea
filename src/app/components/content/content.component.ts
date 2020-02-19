import { Component, OnInit } from '@angular/core';
import { CoctailsList } from 'src/app/_models/cocktailsData.model';
import { GetDataService } from 'src/app/_services/get-data.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  cocktailsLists: CoctailsList[];
  constructor(private getDataServ: GetDataService) { }

  ngOnInit(): void {
    this.getDataServ.obsCocktailsLists.subscribe(
      (data: CoctailsList[]) => this.cocktailsLists = data
    );
  }

}
