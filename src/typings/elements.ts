import { BlockNodeType, EmptyBlockNodeType, SpanNodeType, RichTextSpanProps } from '.';

export type ElementType = BlockNodeType | EmptyBlockNodeType | SpanNodeType;

export interface BaseElementProps {
  type: ElementType;
}

export interface BlockElementProps extends BaseElementProps {
  type: BlockNodeType;
  text: string;
  spans: RichTextSpanProps[];
}

export interface EmptyBlockElementProps extends BaseElementProps {
  type: EmptyBlockNodeType;
}

export interface SpanElementProps extends BaseElementProps {
  type: SpanNodeType;
  text: string;
  data?: any;
}

export type Element = BlockElementProps | EmptyBlockElementProps | SpanElementProps;

export const elements = () => {};
