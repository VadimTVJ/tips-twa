import { ElementType } from 'react';
import { PolymorphicComponentProp } from '../generics';

export const Component = <C extends ElementType>({
  as, ...rest
}: PolymorphicComponentProp<C>) => {
  const Root = as || 'div';

  return (
    <Root {...rest} />
  );
};
