import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-for-engineering-idea';
  isScroll = false;

  @HostListener('window:scroll')
  // В случае скрола выполняем функцию
  onWindowScroll() {
    // Сравниваем прокрученный экран и высоту экрана
    (window.scrollY > window.innerHeight) ?
      this.isScroll = true :
      this.isScroll = false;
  }
}
