import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon';
import { Observable } from 'rxjs/Observable';

import { AppComponent } from './app.component';
import { SurveyComponent } from './components/survey';
import { GraphNodeComponent } from './components/survey/graph-node';
import { SurveyService } from './services/survey';
import { OrderService } from './services/order';
import { VariableService } from './services/variable';


describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SurveyService,
        OrderService,
        VariableService,
        MdIconRegistry
      ],
      declarations: [
        AppComponent,
        SurveyComponent,
        GraphNodeComponent
      ],
      imports: [
        HttpModule,
        MdIconModule
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should request variables and order elements during initialization', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    let service = app.surveyService;

    let variablesSpy = spyOn(service, 'variables').and.returnValue(Observable.of(undefined));
    let orderSpy = spyOn(service, 'order').and.returnValue(Observable.of(undefined));

    app.ngOnInit();

    expect(variablesSpy.calls.count()).toEqual(1, 'request variables element once');
    expect(orderSpy.calls.count()).toEqual(1, 'request order element once');
  }));

});
