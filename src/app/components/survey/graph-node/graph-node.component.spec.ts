import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MdIconModule, MdIconRegistry } from '@angular2-material/icon';
import { Observable } from 'rxjs/Observable';

import { SurveyComponent } from '../survey.component';
import { GraphNodeComponent } from './graph-node.component';
import { SurveyService } from '../../../services/survey';
import { OrderService } from '../../../services/order';
import { VariableService } from '../../../services/variable';

describe('GraphNodeComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SurveyService,
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
    let fixture = TestBed.createComponent(GraphNodeComponent);
    let graphNode = fixture.debugElement.componentInstance;
    expect(graphNode).toBeTruthy();
  }));

  it('should properly handle a graph node with a valid name and elements', async(() => {
    let fixture = TestBed.createComponent(GraphNodeComponent);
    let graphNode = fixture.debugElement.componentInstance;

    graphNode.node = <OrderGraphNode>{
      'MOCK_GRAPH_NODE': [
        <OrderGraphLeaf>'MOCK_LEAF'
      ]
    };
    graphNode.ngOnInit();

    expect(graphNode.nodeName).toContain('MOCK_GRAPH_NODE');
    expect(graphNode.elems[0]).toContain('MOCK_LEAF');
  }));

  it('should properly handle an invalid graph node', async(() => {
    let fixture = TestBed.createComponent(GraphNodeComponent);
    let graphNode = fixture.debugElement.componentInstance;

    graphNode.node = <OrderGraphNode>{};
    graphNode.ngOnInit();

    expect(!!graphNode.nodeName).toBeFalsy();
    expect(!!graphNode.elems).toBeFalsy();

    graphNode.node = <OrderGraphNode><OrderGraphNode>{
      'MOCK_GRAPH_NODE': []
    };
    graphNode.ngOnInit();

    expect(!!graphNode.nodeName).toBeFalsy();
    expect(!!graphNode.elems).toBeFalsy();
  }));

  it('should be colapsed initially and expand when triggered', async(() => {
    let fixture = TestBed.createComponent(GraphNodeComponent);
    let graphNode = fixture.debugElement.componentInstance;

    expect(graphNode.expanded).toBeFalsy();

    graphNode.toggleExpanded(<Event>{stopPropagation: () => {}});
    expect(graphNode.expanded).toBeTruthy();

    graphNode.toggleExpanded(<Event>{stopPropagation: () => {}});
    expect(graphNode.expanded).toBeFalsy();
  }));

});
