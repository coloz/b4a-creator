import { Component } from '@angular/core';
import { LoadService } from './load.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'b4a-creator';

  loaded = false;
  showLoading = true;

  constructor(
    private loadService: LoadService
  ) {
    this.loadService.loaded.subscribe(state => {
      this.loaded = state
      setTimeout(() => {
        this.showLoading = false
      }, 1000);
    })
  }
}
