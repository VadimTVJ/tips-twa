import { createHashRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { PageHome } from './PageHome';
import { PageTip } from './PageTip';
import { RoutesTransition } from '../shared/lib/router-dom-transition';

const routes: RouteObject[] = [
  { path: '/', element: <PageHome /> },
  { path: '/tip', element: <PageTip /> },
];

const router = createHashRouter([
  {
    path: '/',
    element: <RoutesTransition />,
    children: routes.map((route) => ({
      index: route.path === '/',
      path: route.path === '/' ? undefined : route.path,
      element: route.element,
    })),
  },
]);

export const Pages = () => {
  return (
    <RouterProvider router={router} />
  );
};
