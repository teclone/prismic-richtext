import { Node } from './nodes';
import { RichTextProps } from './typings/types';
import { Element } from './typings/elements';
import { asTree } from './asTree';

interface ParentNodeProps {
  [p: string]: any;
}

export type Serializer<T> = (
  element: Element,
  children: T[],
  index: number,
  parentNodeProps: ParentNodeProps,
) => T;

const serializeNode = <T>(
  index: number,
  parentNode: Node,
  serializer: Serializer<T>,
  defaultSerializer?: Serializer<T>,
  parentNodeProps: ParentNodeProps = {},
): T => {
  function step(node: Node, idx: number): T {
    const serializedChildren = node.children.reduce<T[]>(
      (acc: T[], current: Node, i: number) => {
        return acc.concat([step(current, i)]);
      },
      [],
    );

    let serialized = serializer
      ? serializer(node.element, serializedChildren, idx, parentNodeProps)
      : null;

    if (serialized === undefined) {
      return null;
    }

    if (serialized) {
      return serialized;
    }

    if (defaultSerializer) {
      return defaultSerializer(node.element, serializedChildren, idx, parentNodeProps);
    }
    return null;
  }

  return step(parentNode, index);
};

export const serialize = <T>(
  richText: RichTextProps,

  // user given serializer, if it returns undefined, then nothing is rendered, if it returns null, then the default serializer is called
  serializer: Serializer<T>,

  // default serializer, default serializer is used when the user serializer returns null.
  defaultSerializer?: Serializer<T>,

  // parent node props
  parentNodeProps?: ParentNodeProps,
): T[] => {
  return asTree(richText).map((node: Node, index: number) => {
    return serializeNode<T>(index, node, serializer, defaultSerializer, parentNodeProps);
  });
};
