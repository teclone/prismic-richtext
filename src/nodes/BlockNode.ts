import { Node } from './Node';
import { BlockNodeType } from '../typings';
import { BlockElementProps } from '../typings/elements';

export class BlockNode extends Node {
  constructor(
    type: BlockNodeType,
    element: BlockElementProps,
    children: BlockNode[] = [],
  ) {
    super(type, element, children);
  }
}
