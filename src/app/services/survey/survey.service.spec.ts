import { async, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, RequestMethod, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {} from 'jasmine';
import 'rxjs/Rx'

import { SurveyService } from './survey.service';

const MOCK_SURVEY = 'mock:survey'

describe('SurveyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SurveyService,

        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      imports: [
        HttpModule
      ]
    });
    TestBed.compileComponents();
  });

  it('should construct', async(inject(
    [SurveyService, MockBackend],
    (service: SurveyService, mockBackend: MockBackend) => {
      expect(service).toBeDefined();
      expect(service.http).toBeDefined();
    }
  )));

  it('should use an HTTP call to obtain survey variables', async(inject(
    [SurveyService, MockBackend],
    (service: SurveyService, backend: MockBackend) => {
      backend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.url).toBe(
          'http://localhost:4200/assets/variables.json'
        );
      });

      service.variables(MOCK_SURVEY);
    }
  )));

  it('should parse survey variables response correctly', async(inject(
    [SurveyService, MockBackend],
    (service: SurveyService, backend: MockBackend) => {
      backend.connections.subscribe((connection: MockConnection) => {

        let mockResponseBody: VariablesElement = {
          element: 'mock:element',
          self: 'mock:self',
          orders: <Order>{
            hier: 'mock:hier'
          },
          description: 'mock:description',
          index: {
            'mock:variable': <Variable>{
              name: "mock:variable:name",
              type: 'mock:variable:type',
              description: 'mock:variable:description'
            }
          }
        };
        let response = new ResponseOptions({body: JSON.stringify(mockResponseBody)});
        connection.mockRespond(new Response(response));
      });

      service.variables(MOCK_SURVEY)
        .subscribe(variables => {
          expect(variables.element).toEqual('mock:element');
          expect(variables.index['mock:variable'].name).toEqual('mock:variable:name');
          // TODO: variable abstraction and more expects
        });
    }
  )));

  it('should use an HTTP call to obtain survey order', async(inject(
    [SurveyService, MockBackend],
    (service: SurveyService, backend: MockBackend) => {
      backend.connections.subscribe((connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.url).toBe(
          'http://localhost:4200/assets/order.json'
        );
      });

      service.order(MOCK_SURVEY);
    }
  )));

  it('should parse survey order response correctly', async(inject(
    [SurveyService, MockBackend],
    (service: SurveyService, backend: MockBackend) => {
      backend.connections.subscribe((connection: MockConnection) => {

        let mockResponseBody: OrderElement = {
          element: 'mock:element',
          self: 'mock:self',
          graph: [
            'mock:order:leaf:1',
            'mock:order:leaf:2',
            <OrderGraphNode>{
              'mock:order:node': [
                'mock:order:leaf:3',
              ]
            }
          ]
        }
        let response = new ResponseOptions({body: JSON.stringify(mockResponseBody)});
        connection.mockRespond(new Response(response));
      });

      service.order(MOCK_SURVEY)
        .subscribe(order => {
          expect(order.element).toEqual('mock:element');
          expect(order.graph[2]['mock:order:node'][0]).toEqual('mock:order:leaf:3');
          // TODO: variable abstraction and more expects
        });
    }
  )));

});
