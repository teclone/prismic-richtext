import { Node } from './Node';
import { SpanNodeType } from '../typings';
import { SpanElementProps } from '../typings/elements';
import { TextNode } from './TextNode';

export class SpanNode extends Node {
  constructor(type: SpanNodeType, text: string, element: SpanElementProps) {
    super(type, element, [new TextNode(text)]);
  }
}
