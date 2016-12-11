import { Component } from '@angular/core';

import { SurveyService } from './services/survey';
import { OrderService } from './services/order';


@Component({
  selector: 'app-root',
  providers: [
    SurveyService
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app works!';

  constructor(
    public surveyService: SurveyService
  ) {}

  ngOnInit() {
    this.surveyService.order('shoji').subscribe(order => {
      console.log("got order")
    })
  }

}
