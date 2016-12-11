import { Component, Input } from '@angular/core';


@Component({
  selector: 'graph-node',
  styleUrls: [ './graph-node.component.style.less' ],
  templateUrl: './graph-node.component.template.html'
})
export class GraphNodeComponent {

  @Input() node: OrderGraphNode;
  @Input() root: boolean;

  nodeName: string;
  elems: OrderGraphElement[];
  expanded: boolean = true;

  constructor(
  ) {}

  ngOnInit() {
    console.log('hello `GraphNodeComponent`');
    if (this.node) {
      Object.keys(this.node).forEach((nodeName: string) => {
        this.nodeName = nodeName;
        this.elems = this.node[nodeName];
      });
    }
  }

  toggleExpanded(event: Event) {
    event.stopPropagation();
    this.expanded = !this.expanded;
  }

}
