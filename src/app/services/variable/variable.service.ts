import { Injectable } from '@angular/core';

import { SurveyService } from '../survey';


/**
 * Given the current scope of VariablesElement and OrderElement provided by the
 * SurveyService, this service facilitate variable finding by postion.
 */
@Injectable()
export class VariableService {

  private variables: VariablesElement;
  private order: OrderElement;
  private variablePositonToVariable = new Map<VariablePosition, Variable>();

  constructor(
    surveyService: SurveyService
  ) {
    // keep the scope of this service up to date with the most recently queried VariablesElement
    surveyService.currentVariables().subscribe(variables => {
      this.variables = variables;
      this.variablePositonToVariable.clear();
    });
    // keep the scope of this service up to date with the most recently queried OrderElement
    surveyService.currentOrder().subscribe(order => {
      this.order = order;
      this.variablePositonToVariable.clear();
    });
  }

  /**
   * @return Variable at given position if a variable name is found at the given
             positon and the variable name is found in the current variables element
             scope
   */
  variableForPosition(position: VariablePosition): Variable {
    let variable: Variable;

    if (this.variablePositonToVariable.has(position)) {
      // return the result of a previous search
      variable = this.variablePositonToVariable.get(position);
    } else {
      // attempt to find the variable for a position that is not cached
      if (this.variables && this.order) {
        let currentElems: OrderGraphElement[] = this.order.graph;
        let currentElem: OrderGraphElement;
        try {
          position.forEach(pos => {
            if (typeof pos === 'number') {
              currentElem = currentElems[pos];
            } else {
              currentElems = currentElem[pos];
            }
          });
          variable = this.variables.index[<OrderGraphLeaf>currentElem];
          this.variablePositonToVariable.set(position, variable);
        } catch (e) {
          console.log(`Failed to find variable for position [${position}]`);
        }
      }
    }

    return variable;
  }

  /**
   * @return Variable for a given variable name if the variable name is found in
   *         the current variables element scope
   */
  variableForName(variableName: string): Variable {
    let variable: Variable;

    if (this.variables) {
      try {
        variable = this.variables.index[variableName];
      } catch (e) {
        console.log(`Failed to find variable [${variableName}]`);
      }
    }

    return variable;
  }

}
