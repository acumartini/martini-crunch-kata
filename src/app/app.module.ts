import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon';

import { AppComponent } from './app.component';
import { SurveyComponent } from './components/survey';
import { GraphNodeComponent } from './components/survey/graph-node';


@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    GraphNodeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdIconModule
  ],
  providers: [
    MdIconRegistry
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
