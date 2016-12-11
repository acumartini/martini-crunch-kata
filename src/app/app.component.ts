import { Component } from '@angular/core';

import { SurveyService } from './services/survey';
import { OrderService } from './services/order';
import { VariableService } from './services/variable';


@Component({
  selector: 'app-root',
  providers: [
    SurveyService,
    OrderService,
    VariableService
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app works!';

  constructor(
    public surveyService: SurveyService,
    public orderService: OrderService,
    public variableService: VariableService
  ) {}

  ngOnInit() {
    this.surveyService.order('shoji').subscribe(order => {
      console.log("got order")
    })
  }

}
