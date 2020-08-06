import { BlockNodeType, EmptyBlockNodeType, SpanNodeType, RichTextSpanProps } from '.';

export type ElementType = BlockNodeType | EmptyBlockNodeType | SpanNodeType;

export interface BaseElementProps {
  type: ElementType;
  text: string;
}

export interface BlockElementProps extends BaseElementProps {
  type: BlockNodeType;
  spans: RichTextSpanProps[];
}

export interface EmptyBlockElementProps extends BaseElementProps {
  type: EmptyBlockNodeType;
}

export interface SpanElementProps extends BaseElementProps {
  type: SpanNodeType;
  data?: any;
}

export type Element = BlockElementProps | EmptyBlockElementProps | SpanElementProps;

export const elements = () => {};
