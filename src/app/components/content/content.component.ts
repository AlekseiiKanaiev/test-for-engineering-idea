import { Component, OnInit, HostListener, OnDestroy, AfterViewChecked } from '@angular/core';
import { CoctailsList } from 'src/app/_models/cocktailsData.model';
import { GetDataService } from 'src/app/_services/get-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, AfterViewChecked, OnDestroy {
  private contentSubs: Subscription;
  cocktailsLists: CoctailsList[] = [];

  constructor(private getDataServ: GetDataService) { }

  @HostListener('window:scroll')
  // В случае скрола выполняем функцию
  onWindowScroll() {
    // Сравниваем прокрученный экран и высоту экрана
    if (window.scrollY + window.innerHeight >= window.document.body.offsetHeight) {
      this.getDataServ.requestData();
    }
  }

  ngOnInit(): void {
    this.contentSubs = this.getDataServ.obsCocktailsLists.subscribe(
      (data: CoctailsList[]) => {
        if (data.length !== 0) {
          this.cocktailsLists = this.cocktailsLists.concat(data);
        } else {
          this.cocktailsLists.length = 0;
        }
      }
    );
  }

  ngAfterViewChecked() {
    if (window.innerHeight >= window.document.body.offsetHeight && this.cocktailsLists.length > 0) {
      this.getDataServ.requestData();
    }
  }

  ngOnDestroy() {
    this.contentSubs.unsubscribe();
  }
}
