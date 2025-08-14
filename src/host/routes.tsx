import Index from './pages/index.page';
import { createHashRouter } from 'react-router-dom';
import { sortingVisualizerRoutes } from '@/apps/sorting-visualizer/routes';

export const router = createHashRouter([
  ...sortingVisualizerRoutes,
  {
    path: '/',
    element: <Index />,
  },
]);
