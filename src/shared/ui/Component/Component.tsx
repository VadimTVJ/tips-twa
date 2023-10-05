import { ElementType } from 'react';
import { PolymorphicComponentProp } from '../generics';

type ComponentProps = {};

export const Component = <C extends ElementType = 'div'>({ as, ...rest }: PolymorphicComponentProp<C, ComponentProps>) => {
  const Root = as || 'div';

  return (
    <Root {...rest} />
  );
};
