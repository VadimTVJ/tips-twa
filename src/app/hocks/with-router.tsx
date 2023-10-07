import { ComponentType } from 'react';
import { MemoryRouter } from 'react-router-dom';

export const withRouter = (Component: ComponentType) => () => (
  <MemoryRouter>
    <Component />
  </MemoryRouter>
);
