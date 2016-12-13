import { Injectable } from '@angular/core';

import { OrderGraphUtils } from '../../utils/order-graph';
import { SurveyService } from '../survey';


/**
 * Given the current scope of VariablesElement and OrderElement provided by the
 * SurveyService, this service facilitate position finding for variables by name.
 */
@Injectable()
export class OrderService {

  private order: OrderElement;
  private variableNameToPosition = new Map<string, VariablePosition>();

  constructor(
    surveyService: SurveyService
  ) {
    // keep the scope of this service up to date with the most recently queried OrderElement
    surveyService.currentOrder().subscribe(order => {
      this.order = order;
      this.variableNameToPosition.clear();
    });
  }

  /**
   * @return VariablePosition if the variable name is found in the order, else undefined
   */
  variablePosition(variableName: string): VariablePosition {
    let position: VariablePosition;

    if (this.variableNameToPosition.has(variableName)) {
      // return the result of a previous search
      position = this.variableNameToPosition.get(variableName);
    } else {
      // attempt to the the postion for a variable name that is not cached
      position = this.findPosition(variableName, undefined, this.order.graph);
      this.variableNameToPosition.set(variableName, position);
    }

    return position;
  }

  /**
   * Searches each element for the given variable name (recursively for each OrderGraphNode)
   *
   * @return the provided nodeName if variable name is found in an OrderGraphLeaf
   *         else the nodeName *prepended* to a VariablePosition if the variable name
   *         is found nested in a OrderGraphNode
   */
  private findPosition(
    variableName: string,
    nodeName: string,
    elems: OrderGraphElement[]
  ): VariablePosition {
    let position: VariablePosition;

    if (this.order) {
      // search the order elements *until* the position is determined
      elems.find((elem: OrderGraphElement, index: number) => {
        if (OrderGraphUtils.isLeaf(elem)) {
          if (elem === variableName) {
            if (nodeName) {
              position = [nodeName, index];
            } else {
              position = [index];
            }
          }
        } else {
          let childPosition = this.findPositionRec(variableName, <OrderGraphNode>elem);
          if (childPosition) {
            if (nodeName) {
              position = [nodeName, index].concat(childPosition);
            } else {
              position = (<VariablePosition>[index]).concat(childPosition);
            }
          }
        }
        return !!position;
      });
    }

    return position;
  }

  /**
   * Iterates through nodeName keys in a OrderGraphNode calling the findPosition
   * for each key.
   */
  private findPositionRec(variableName: string, node: OrderGraphNode): VariablePosition {
    let position: VariablePosition;

    // search each order node *until* the position is determined
    Object.keys(node).find((nodeName: string) => {
      let elems = node[nodeName];
      position = this.findPosition(variableName, nodeName, elems);
      return !!position;
    });

    return position;
  }

}
