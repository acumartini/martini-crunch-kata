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

  variable: Variable;

  constructor(
    public variableService: VariableService,
    public orderService: OrderService
  ) {}

  ngOnInit() {
    console.log('hello `SurveyComponent`');
  }

  isValidLeaf(elem: OrderGraphElement): boolean {
    if (this.isLeaf(elem)) {
      this.variable = this.variableService.variableForName(elem);
      return !!this.variable && !!this.variable.name;
    }
    return false;
  }

  private isLeaf(elem: OrderGraphElement): elem is OrderGraphLeaf {
    return typeof elem === 'string';
  }

}
