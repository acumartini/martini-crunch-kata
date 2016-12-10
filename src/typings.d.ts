interface SurveyElement {
  element: string,
  self: string
}

interface Variable {
  name: string,
  type: string,
  description: string
}

interface VariablesElement extends SurveyElement {
  orders: Order, // TODO: name implies more than one order?
  description: string,
  index: { [key:string]: Variable }
}

interface Order {
  hier: string
}

type OrderGraphNode = { [key:string]: (string | OrderGraphNode)[] };

interface OrderElement extends SurveyElement {
  graph: (string | OrderGraphNode)[]
}
