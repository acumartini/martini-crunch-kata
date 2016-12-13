import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'graph-node',
  styleUrls: ['./graph-node.component.style.less'],
  templateUrl: './graph-node.component.template.html'
})
export class GraphNodeComponent implements OnInit {

  @Input() node: OrderGraphNode;
  @Input() root: boolean;

  nodeName: string;
  elems: OrderGraphElement[];
  expanded: boolean = false;

  constructor() { }

  ngOnInit() {
    if (this.node) {
      Object.keys(this.node).forEach((nodeName: string) => {
        let elems = this.node[nodeName];
        if (elems.length > 0) {
          this.nodeName = nodeName;
          this.elems = elems;
        }
      });
    }
  }

  toggleExpanded(event: Event) {
    event.stopPropagation();
    this.expanded = !this.expanded;
  }

}
