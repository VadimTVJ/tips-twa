import {
  DependencyList, EffectCallback, useEffect, useRef,
} from 'react';

export const useUpdateEffect = (effect: EffectCallback, deps: DependencyList | undefined) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      return effect();
    }

    isFirstRender.current = false;
    return () => {};
  }, deps);
};
