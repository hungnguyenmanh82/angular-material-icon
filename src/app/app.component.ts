import { Component, OnInit } from '@angular/core';
import { ExtendNode, DATA_NODES, IExtendNode } from './ExtendNode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'd21-material-icon';

  nodes?: ExtendNode[];
  ngOnInit() {
    this.nodes = ExtendNode.convertDatas2Nodes(DATA_NODES);

    console.log(DATA_NODES);
    console.log(this.nodes);
  }

  public checkNodeType(node: ExtendNode) {
    console.log(node instanceof ExtendNode);
    if (node.children) {
      node.children.forEach((childNode) => {
        this.checkNodeType(childNode);
      });
    }
  }
}
