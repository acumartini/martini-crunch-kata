import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import {} from 'jasmine';

import { SurveyService } from '../survey';
import { VariableService } from './variable.service';

const MOCK_ORDER_ELEMENT = <OrderElement>{
  "element": "mock:order",
  "self": "mock:self",
  "graph": [
    "LOOP_BREAKER", {
    "MOCK_NODE_1": [{
      "MOCK_NODE_2": ["11b0b9", "7a89e0"]
    }, {
      "MOCK_NODE_3": ["786c0f", "2d27ab"]
    }]}, {
    "MOCK_NODE_4": [{
      "MOCK_NODE_5": ["ede6a8", "62c00f", "0f6ce0", "f2a681"]
    }, {
      "MOCK_NODE_6": ["8d7127", "ee3e40", "8f7db6", "3a5f89"]
    }]
    },
    "d0fe8b",
    "0894c5",
    "NOPE_NOT_HAPPENING"
  ]
};
const MOCK_VARIABLES_ELEMENT = <VariablesElement>{
  "element": "mock:variables",
  "self": "mock:self",
  "orders": {
    "hier": "mock:order:hier"
  },
  "description": "mock:variables:description",
  "index": {
    "0894c5": {
      "name": "mock:variable:name1",
      "type": "mock:variable:type1",
      "description": "mock:variable:description1"
    },
    "786c0f": {
      "name": "mock:variable:name2",
      "type": "mock:variable:type2",
      "description": "mock:variable:description2"
    }
  }
};
const EMPTY_VARIABLES_ELEMENT = <VariablesElement>{
  "element": "mock:variables",
  "self": "mock:self",
  "orders": {
    "hier": "mock:order:hier"
  },
  "description": "mock:variables:description",
  "index": {}
};

describe('VariablePostionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
        {
          provide: SurveyService,
          useFactory: (http) => {
            var service = new SurveyService(http);
            spyOn(service, 'currentOrder').and.returnValue(Observable.of(MOCK_ORDER_ELEMENT));
            spyOn(service, 'currentVariables').and.returnValue(Observable.of(MOCK_VARIABLES_ELEMENT));
            return service;
          },
          deps: [Http]
        },
        VariableService
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should return a variable for a root level position', async(inject(
    [SurveyService, VariableService],
    (survey: SurveyService, service: VariableService) => {
      let result = service.variableFor([4]);
      let expected = <Variable>{
        "name": "mock:variable:name1",
        "type": "mock:variable:type1",
        "description": "mock:variable:description1"
      };
      expect(result.name).toEqual(expected.name);
      expect(result.type).toEqual(expected.type);
      expect(result.description).toEqual(expected.description);
    }
  )));

  it('should return a variable for a deeply nested position', async(inject(
    [SurveyService, VariableService],
    (survey: SurveyService, service: VariableService) => {
      let result = service.variableFor([1, 'MOCK_NODE_1', 1, 'MOCK_NODE_3', 0]);
      let expected = <Variable>{
        "name": "mock:variable:name2",
        "type": "mock:variable:type2",
        "description": "mock:variable:description2"
      };
      expect(result.name).toEqual(expected.name);
      expect(result.type).toEqual(expected.type);
      expect(result.description).toEqual(expected.description);
    }
  )));

  it('should return undefined for an invalid position', async(inject(
    [SurveyService, VariableService],
    (survey: SurveyService, service: VariableService) => {
      let result = service.variableFor([10]);
      expect(result).toEqual(undefined);

      result = service.variableFor(['NOPE_NOT_HAPPENING']);
      expect(result).toEqual(undefined);

      result = service.variableFor([1, 'NOPE_NOT_HAPPENING']);
      expect(result).toEqual(undefined);
    }
  )));

  it('should return undefined for an invalid variable name', async(inject(
    [SurveyService, VariableService],
    (survey: SurveyService, service: VariableService) => {
      let result = service.variableFor([5]);
      expect(result).toEqual(undefined);
    }
  )));

});
