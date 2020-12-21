import { EmptyBlockNodeType } from '../typings';
import { Node } from './Node';
import { EmptyBlockElementProps } from '../typings/elements';

export class EmptyBlockNode extends Node {
  constructor(type: EmptyBlockNodeType, element: EmptyBlockElementProps) {
    super(element, []);
  }
}
