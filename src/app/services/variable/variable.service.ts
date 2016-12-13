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

  // Note: the key for this cache is created from a VariablePosition via positionToKey below
  private variablePositonToVariable = new Map<string, Variable>();

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
    let positionKey = this.positionToKey(position);

    if (this.variablePositonToVariable.has(positionKey)) {
      // return the result of a previous search
      variable = this.variablePositonToVariable.get(positionKey);
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
          this.variablePositonToVariable.set(positionKey, variable);
        } catch (e) {
          console.log(`Failed to find variable for position [${position}]`);
          // record the failed attempt in the cache it may have been missed above
          this.variablePositonToVariable.set(positionKey, undefined);
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

  /**
   * @return A string representation of a VariablePosition such that each element
   *         is separated by a ':', i.e. <VariablePosition>[1, "TWO", 3] => '1:TWO:3'
   */
  private positionToKey(position: VariablePosition): string {
    let key = '';
    position.forEach((elem: (string | number), index: number) => {
      if (index === 0) {
        key += elem;
      } else {
        key += ':' + elem
      }
    });

    return key;
  }

}
