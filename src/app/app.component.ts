import { Component } from '@angular/core';
import { HelpersService } from './shared/services/helpers.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'invoice-theme';
  constructor(public helpers: HelpersService) {}
}
