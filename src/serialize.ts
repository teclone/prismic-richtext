import { Node } from './nodes';
import { asTree } from './asTree';
import { RichTextNodeProps } from './typings';
import { ReactElement } from 'react';

interface ParentNodeProps {
  [p: string]: any;
}

export type Serializer<P = ParentNodeProps> = (
  node: Node,
  children: ReactElement,
  index: number,
  parentNodeProps: P
) => ReactElement | null;

const serializeNode = <P>(
  index: number,
  parentNode: Node,
  serializer: Serializer<P>,
  defaultSerializer?: Serializer<P>,
  parentNodeProps: P = {} as any
) => {
  function step(node: Node, idx: number) {
    const serializedChildren = node.children.reduce(
      (acc, current: Node, i: number) => {
        return acc.concat([step(current, i)]);
      },
      []
    );

    let serialized = serializer
      ? serializer(node, serializedChildren, idx, parentNodeProps)
      : null;

    if (serialized === undefined) {
      return null;
    }

    if (serialized) {
      return serialized;
    }

    if (defaultSerializer) {
      return defaultSerializer(node, serializedChildren, idx, parentNodeProps);
    }
    return null;
  }

  return step(parentNode, index);
};

export const serialize = <P>(
  richText: RichTextNodeProps[],

  // user given serializer, if it returns undefined, then nothing is rendered, if it returns null, then the default serializer is called
  serializer: Serializer<P>,

  // default serializer, default serializer is used when the user serializer returns null.
  defaultSerializer?: Serializer<P>,

  // parent node props
  parentNodeProps?: P
) => {
  return asTree(richText).map((node: Node, index: number) => {
    return serializeNode<P>(
      index,
      node,
      serializer,
      defaultSerializer,
      parentNodeProps
    );
  });
};
