import { RichTextBlockNodeProps } from '../typings/types';
import { fillupSpans } from './fillupSpans';
import { TextNode, SpanNode } from '../nodes';

export const processTextBlock = (
  block: RichTextBlockNodeProps,
): Array<SpanNode | TextNode> => {
  return fillupSpans(block.spans || [], block.text).map((span) => {
    if (span.type === 'text') {
      return new TextNode(span.text);
    } else {
      return new SpanNode(span.type, span.text, {
        type: span.type,
        data: span.data,
        text: span.text,
      });
    }
  });
};
