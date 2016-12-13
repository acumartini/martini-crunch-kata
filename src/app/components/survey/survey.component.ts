import { Component, Input } from '@angular/core';

import { OrderGraphUtils } from '../../utils/order-graph';
import { VariableService } from '../../services/variable';
import { OrderService } from '../../services/order';


@Component({
  selector: 'survey',
  styleUrls: ['./survey.component.style.less'],
  templateUrl: './survey.component.template.html'
})
export class SurveyComponent {

  @Input() graph: OrderGraphElement[];
  @Input() root: boolean = true;

  variable: Variable;
  isLeaf = OrderGraphUtils.isLeaf; // required for use in template

  constructor(
    public variableService: VariableService,
    public orderService: OrderService
  ) { }

  isValidLeaf(elem: OrderGraphElement): boolean {
    if (OrderGraphUtils.isLeaf(elem)) {
      this.variable = this.variableService.variableForName(elem);
      return !!this.variable && !!this.variable.name;
    }
    return false;
  }

}
