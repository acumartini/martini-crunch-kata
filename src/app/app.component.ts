import { Component } from '@angular/core';

import { SurveyService } from './services/survey';


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
    console.log('Hello from "App" Component');
  }

}
