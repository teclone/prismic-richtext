import React, { FunctionComponent } from 'react';
import { RichTextProps } from '../typings';
import { Serializer, serialize } from '../serialize';

export interface RichTextComponentProps {
  text: RichTextProps | string;
  Component?: any;
  serializer: Serializer<any>;
  [p: string]: any;
}

export const RichTextComponent: FunctionComponent<RichTextComponentProps> = ({
  text,
  serializer,
  Component = 'div',
  ...componentProps
}) => {
  if (typeof text === 'string') {
    return <Component {...componentProps}>{text}</Component>;
  } else {
    return (
      <Component {...componentProps}>
        {serialize(text, serializer, null, componentProps)}
      </Component>
    );
  }
};
