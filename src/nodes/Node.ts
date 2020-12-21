import { ElementType, Element } from '../typings/elements';

export class Node {
  type: ElementType;
  element: Element;
  children: Node[];

  constructor(element: Element, children: Node[]) {
    this.type = element.type = element.type || 'paragraph';
    this.element = element;
    this.children = children;
  }

  addChild(node: Node) {
    this.children.push(node);
  }
}
