import React, { FunctionComponent } from 'react';
import { Serializer, serialize } from '../serialize';
import { RichTextNodeProps } from '../typings';

export interface RichTextComponentProps {
  text: RichTextNodeProps[] | string;
  Component?: any;
  serializer: Serializer<any>;
  [p: string]: any;
}

export const RichTextComponent: FunctionComponent<RichTextComponentProps> = ({
  text,
  serializer,
  Component = React.Fragment,
  ...componentProps
}) => {
  const props = Component !== React.Fragment ? componentProps : {};

  if (typeof text === 'string') {
    return <Component {...props}>{text}</Component>;
  } else {
    return (
      <Component {...props}>
        {serialize(text, serializer, null, componentProps)}
      </Component>
    );
  }
};
