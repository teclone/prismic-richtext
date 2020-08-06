export type SpanNodeType = 'hyperlink' | 'em' | 'strong' | 'label' | 'text';

export type BlockNodeType =
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'heading4'
  | 'heading5'
  | 'heading6'
  | 'paragraph'
  | 'preformated'
  | 'list-item'
  | 'o-list-item'
  | 'group-list-item'
  | 'group-o-list-item';

export type EmptyBlockNodeType = 'image' | 'embed';

export type RichTextNodeType = BlockNodeType | EmptyBlockNodeType;

export interface RichTextLinkToProps {
  url: string;
  target: string;
}

export interface RichTextOEmbedProps {
  embed_url: string;
  provider_name: string;
  type: string;
  label?: string;
}

export interface RichTextImageProps {
  linkTo?: RichTextLinkToProps;
  label?: string;
  url: string;
  alt?: string;
}

export interface RichTextSpanProps {
  start: number;
  end: number;
  type: SpanNodeType;
  data: any;
}

export interface RichTextSpanWithTextProps extends RichTextSpanProps {
  text: string;
}

export interface RichTextBaseNodeProps {
  type: RichTextNodeType;
}

export interface RichTextBlockNodeProps extends RichTextBaseNodeProps {
  type: BlockNodeType;
  text: string;
  spans: RichTextSpanProps[];
}

export interface RichTextImageNodeProps
  extends RichTextBaseNodeProps,
    RichTextImageProps {
  type: 'image';
}

export interface RichTextOEmbedNodeProps
  extends RichTextBaseNodeProps,
    RichTextOEmbedProps {
  type: 'embed';
}

export type RichTextNodeProps =
  | RichTextBlockNodeProps
  | RichTextImageNodeProps
  | RichTextOEmbedNodeProps;

export const dummy1 = () => null;
