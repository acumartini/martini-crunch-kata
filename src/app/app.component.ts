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
  variables: VariablesElement;
  order: OrderElement;

  constructor(
    public surveyService: SurveyService,
    public orderService: OrderService,
    public variableService: VariableService
  ) {}

  ngOnInit() {
    // update survey scope for 'shoji' variables
    this.surveyService.variables('shoji').subscribe(variables => {
      this.variables = variables;
    });
    // update survey scope for 'shoji' order
    this.surveyService.order('shoji').subscribe(order => {
      this.order = order;
    });
  }

}
