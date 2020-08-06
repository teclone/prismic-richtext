import { RichTextProps } from './typings/types';

export const asText = (
  richtext: RichTextProps,
  joinString?: string | null | undefined,
) => {
  const join = typeof joinString === 'string' ? joinString : ' ';
  return richtext
    .map((element) => {
      if (element.type !== 'embed' && element.type !== 'image') {
        return element.text;
      }
      return '';
    })
    .map((result) => result.trim())
    .join(join);
};
