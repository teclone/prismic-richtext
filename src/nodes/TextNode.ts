import { Node } from './Node';
import { SpanElementProps } from '../typings/elements';

export class TextNode extends Node {
  constructor(text: string) {
    super({ type: 'text', text, data: undefined } as SpanElementProps, []);
  }
}
