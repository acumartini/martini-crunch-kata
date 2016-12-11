import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import {} from 'jasmine';

import { SurveyService } from '../survey';
import { OrderService } from './order.service';

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
    "0894c5"
  ]
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
            return service;
          },
          deps: [Http]
        },
        OrderService
      ],
      imports: [
        HttpModule
      ]
    });
    TestBed.compileComponents();
  });

  it('should return the position of a variable name at the root level', async(inject(
    [SurveyService, OrderService],
    (survey: SurveyService, service: OrderService) => {
      let result = service.variablePosition('0894c5')
      let expected = [4];
      expect(result.length).toEqual(expected.length);
      expect(result[0]).toEqual(expected[0]);
    }
  )));

  it('should return the position of a deeply nested variable name', async(inject(
    [SurveyService, OrderService],
    (survey: SurveyService, service: OrderService) => {
      let result = service.variablePosition('3a5f89')
      let expected = [2, 'MOCK_NODE_4', 1, 'MOCK_NODE_6', 3];
      expect(result.length).toEqual(expected.length);
      for (let i = 0; i < result.length; i++) {
        expect(result[i]).toEqual(expected[i]);
      }
    }
  )));

  it('should only iterate *until* the variable name is found', async(inject(
    [SurveyService, OrderService],
    (survey: SurveyService, service: OrderService) => {
      let findPositionRecSpy = spyOn(service, 'findPositionRec');
      let isLeafSpy = spyOn(service, 'isLeaf').and.returnValue(true);

      let result = service.variablePosition('LOOP_BREAKER');
      let expected = [0];

      expect(result.length).toEqual(expected.length);
      expect(result[0]).toEqual(expected[0]);

      expect(findPositionRecSpy.calls.count()).toBe(0, 'findPositionRec method was not called');
      expect(isLeafSpy.calls.count()).toBe(1, 'isLeaf method was called once');
    }
  )));

  it('should return undefined for a variable name that is not found', async(inject(
    [SurveyService, OrderService],
    (survey: SurveyService, service: OrderService) => {
      let result = service.variablePosition('NOPE_NOT_HAPPENING');
      expect(result).toEqual(undefined);
    }
  )));

});
