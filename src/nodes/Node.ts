import { ElementType, Element } from '../typings/elements';

export class Node {
  type: ElementType;
  element: Element;
  children: Node[];

  constructor(type: ElementType, element: Element, children: Node[]) {
    this.type = type;
    this.element = element;
    this.children = children;
  }

  addChild(node: Node) {
    this.children.push(node);
  }
}
