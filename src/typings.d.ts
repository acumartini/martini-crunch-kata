//// Common Models

interface SurveyElement {
  element: string,
  self: string
}

//// Variable Models

interface Variable {
  name: string,
  type: string,
  description: string
}

type VariablePosition = (number | string)[];

interface VariablesElement extends SurveyElement {
  orders: Order, // TODO: name implies more than one order?
  description: string,
  index: { [key:string]: Variable }
}

//// Order Models

interface Order {
  hier: string
}

type OrderGraphLeaf = string;
type OrderGraphNode = { [key:string]: OrderGraphElement[] };
type OrderGraphElement = OrderGraphLeaf | OrderGraphNode;

interface OrderElement extends SurveyElement {
  graph: OrderGraphElement[]
}
