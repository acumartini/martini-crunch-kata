/**
 * For a given OrderElement, this service facilitate position finding for variables
 * by name.
 */
export class OrderService {

  private order: OrderElement;

  constructor(
    order: OrderElement
  ) {
    this.order = order;
  }

  /**
   * @return VariablePosition if the variable name is found in the order, else undefined
   */
  position(variableName: string): VariablePosition {
    return this.findPosition(variableName, undefined, this.order.graph);
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
    elems: (OrderGraphLeaf | OrderGraphNode)[]
  ): VariablePosition {
    let position: VariablePosition;

    // search the order elements *until* the position is determined
    elems.find((elem: (OrderGraphLeaf | OrderGraphNode), index: number) => {
      if (this.isLeaf(elem)) {
        if (elem === variableName) {
          if (nodeName) {
            position = [nodeName, index];
          } else {
            position = [index];
          }
        }
      } else {
        let childPosition = this.findPositionRec(variableName, <OrderGraphNode>elem)
        if (childPosition) {
          if (nodeName) {
            position = [nodeName, index].concat(childPosition);
          } else {
            position = (<VariablePosition>[index]).concat(childPosition);
          }
        }
      }
      return !!position
    });

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
      var elems = node[nodeName];
      position = this.findPosition(variableName, nodeName, elems);
      return !!position;
    });

    return position;
  }

  private isLeaf(elem: OrderGraphLeaf | OrderGraphNode): elem is OrderGraphLeaf {
    return typeof elem === 'string';
  }

}
