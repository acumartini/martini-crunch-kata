/**
 * Holds common functionality for OrderGraph processing.
 */
export class OrderGraphUtils {

  static isLeaf(elem: OrderGraphElement): elem is OrderGraphLeaf {
    return typeof elem === 'string';
  }

}
