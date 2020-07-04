import Tree from './tree';
import { Node, SpanNode, NodeElement } from './nodes';
import { RichTextBlock } from './richtext';

interface ParentNodeProps {
  [p: string]: any;
}

type Serializer<T> = (
  type: string,
  element: NodeElement,
  text: string | null,
  children: T[],
  index: number,
  parentNodeProps: ParentNodeProps,
) => T;

function serializeNode<T>(
  parentNode: Node,
  serializer: Serializer<T>,
  index: number,
  htmlSerializer?: Serializer<T>,
  parentNodeProps?: ParentNodeProps,
): T {
  function step(node: Node, idx: number): T {
    const text = node instanceof SpanNode ? node.text : null;
    const serializedChildren = node.children.reduce<T[]>(
      (acc: T[], current: Node, i: number) => {
        return acc.concat([step(current, i)]);
      },
      [],
    );

    let serialized = htmlSerializer
      ? htmlSerializer(
          node.type,
          node.element,
          text,
          serializedChildren,
          idx,
          parentNodeProps || {},
        )
      : null;

    if (serialized === undefined) {
      return null;
    } else {
      return (
        serialized ||
        serializer(
          node.type,
          node.element,
          text,
          serializedChildren,
          idx,
          parentNodeProps || {},
        )
      );
    }
  }

  return step(parentNode, index);
}

function fromRichText<T>(
  richText: RichTextBlock[],

  // default serializer, default serializer is used when the user serializer returns null.
  serialize: Serializer<T>,

  // user given serializer, if it returns undefined, then nothing is rendered, if it returns null, then the default serializer is called
  htmlSerializer?: Serializer<T>,

  // parent node props
  parentNodeProps?: ParentNodeProps,
): T[] {
  const tree = Tree.fromRichText(richText);
  return tree.children.map((node: Node, index: number) => {
    return serializeNode<T>(node, serialize, index, htmlSerializer, parentNodeProps);
  });
}

export default fromRichText;
