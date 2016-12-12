import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule, Http } from '@angular/http';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon';
import { Observable } from 'rxjs/Observable';

import { SurveyComponent } from './survey.component';
import { GraphNodeComponent } from './graph-node';
import { SurveyService } from '../../services/survey';
import { OrderService } from '../../services/order';
import { VariableService } from '../../services/variable';

const MOCK_VARIABLES_ELEMENT = <VariablesElement>{
  "element": "mock:variables",
  "self": "mock:self",
  "orders": {
    "hier": "mock:order:hier"
  },
  "description": "mock:variables:description",
  "index": {
    "VALID_LEAF": {
      "name": "mock:variable:name1",
      "type": "mock:variable:type1",
      "description": "mock:variable:description1"
    },
    "INVALID_LEAF": {
      "name": "",
      "type": "mock:variable:type1",
      "description": "mock:variable:description1"
    },
  }
};

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: SurveyService,
          useFactory: (http) => {
            var service = new SurveyService(http);
            spyOn(service, 'currentVariables').and.returnValue(Observable.of(MOCK_VARIABLES_ELEMENT));
            return service;
          },
          deps: [Http]
        },
        OrderService,
        VariableService,
        MdIconRegistry
      ],
      declarations: [
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

  it('should create the survey component', async(() => {
    let fixture = TestBed.createComponent(SurveyComponent);
    let survey = fixture.debugElement.componentInstance;
    expect(survey).toBeTruthy();
  }));

  it('should properly test a valid leaf', async(() => {
    let fixture = TestBed.createComponent(SurveyComponent);
    let survey = fixture.debugElement.componentInstance;
    let leaf = <OrderGraphLeaf>"VALID_LEAF";

    expect(survey.isValidLeaf(leaf)).toBeTruthy();
  }));

  it('should properly test an invalid leaf', async(() => {
    let fixture = TestBed.createComponent(SurveyComponent);
    let survey = fixture.debugElement.componentInstance;
    let leaf = <OrderGraphLeaf>"INVALID_LEAF";

    expect(survey.isValidLeaf(leaf)).toBeFalsy();
  }));

  it('should properly test a missing leaf', async(() => {
    let fixture = TestBed.createComponent(SurveyComponent);
    let survey = fixture.debugElement.componentInstance;
    let leaf = <OrderGraphLeaf>"NOPE_NOT_HAPPENING";

    expect(survey.isValidLeaf(leaf)).toBeFalsy();
  }));

});
