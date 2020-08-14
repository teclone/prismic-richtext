import { BlockNode, Node, EmptyBlockNode } from './nodes';
import { processTextBlock } from './utils';
import { RichTextNodeProps } from './typings';

export const asTree = (richText: RichTextNodeProps[] = []) => {
  return (richText || []).reduce<Node[]>((acc, element, index) => {
    if (element.type === 'embed' || element.type === 'image') {
      acc.push(new EmptyBlockNode(element.type, element));
      return acc;
    }

    if (element.type === 'group-list-item' || element.type === 'group-o-list-item') {
      acc.push(new BlockNode(element.type, element, []));
      return acc;
    }

    element.text = element.text || '';

    if (element.text.trim()) {
      const textNodes = processTextBlock(element);

      if (element.type === 'list-item' || element.type === 'o-list-item') {
        let prev = acc[acc.length - 1];
        if (
          !prev ||
          (prev.type !== 'group-list-item' && prev.type !== 'group-o-list-item')
        ) {
          prev = new BlockNode(`group-${element.type}` as any, {
            text: '',
            type: `group-${element.type}` as any,
            spans: [],
          });
          acc.push(prev);
        }
        prev.addChild(new BlockNode(element.type, element, textNodes));
        return acc;
      }

      acc.push(new BlockNode(element.type, element, textNodes));
    }
    return acc;
  }, []);
};
