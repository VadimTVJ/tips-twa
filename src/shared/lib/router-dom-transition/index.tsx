import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { useLocation, useOutlet } from 'react-router-dom';
import { useRef } from 'react';

export const RoutesTransition = () => {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const nodeRef = useRef<HTMLDivElement>(null);

  return (
    <SwitchTransition>
      <CSSTransition
        key={location.pathname}
        nodeRef={nodeRef}
        timeout={300}
        classNames="page"
        unmountOnExit
      >
        {() => (
          <div ref={nodeRef} className="page">
            {currentOutlet}
          </div>
        )}
      </CSSTransition>
    </SwitchTransition>
  );
};
