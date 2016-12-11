import { Component, Input } from '@angular/core';

import { VariableService } from '../../services/variable';
import { OrderService } from '../../services/order';


@Component({
  selector: 'survey',
  styleUrls: [ './survey.component.style.less' ],
  templateUrl: './survey.component.template.html'
})
export class SurveyComponent {

  @Input() graph: OrderGraphElement[];
  @Input() root: boolean = true;

  constructor(
    public variableService: VariableService,
    public orderService: OrderService
  ) {}

  ngOnInit() {
    console.log('hello `Survey` component');
  }

  isLeaf(elem: OrderGraphElement): elem is OrderGraphLeaf {
    return typeof elem === 'string';
  }

}
