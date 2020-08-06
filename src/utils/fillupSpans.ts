import { RichTextSpanProps, RichTextSpanWithTextProps, SpanNodeType } from '../typings';

export const fillupSpans = (spans: RichTextSpanProps[], text: string) => {
  const results: RichTextSpanWithTextProps[] = [];

  const constructSpan = (
    type: SpanNodeType,
    start: number,
    end: number,
    data?,
  ): RichTextSpanWithTextProps => {
    return {
      start,
      end,
      text: text.substring(start, end),
      type,
      data,
    };
  };

  if (spans.length === 0) {
    spans.push(constructSpan('text', 0, text.length, undefined));
  }

  spans.forEach((span, index) => {
    const isLastSpan = index === spans.length - 1;
    const isFirstSpan = index === 0;

    if (isFirstSpan && span.start !== 0) {
      results.push(constructSpan('text', 0, span.start));
    }

    let prev = results[results.length - 1];

    if (prev && span.start < prev.end) {
      // skip it, this module assumes that there is only one formatting for a given range. formatting should never overlap.
      // the reason for is this, is that most use cases allow for this
    } else {
      if (span.start !== prev.end) {
        results.push(constructSpan('text', prev.end, span.start));
      }
      prev = constructSpan(span.type, span.start, span.end, span.data);
      results.push(prev);
    }

    if (isLastSpan && prev.end !== text.length) {
      results.push(constructSpan('text', prev.end, text.length));
    }
  });

  return results;
};
