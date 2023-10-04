import { ComponentType } from 'react';
import { HashRouter } from 'react-router-dom';

export const withRouter = (Component: ComponentType) => () => (
  <HashRouter>
    <Component />
  </HashRouter>
);
