import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './ui/Home';
import Menu, { loader as menuLoader } from './features/Menu/Menu';
import Order, { loader as orderLoader } from './features/Order/Order';
import Cart from './features/Cart/Cart';
import CreateOrder, {
  action as orderAction,
} from './features/Order/CreateOrder';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/menu',
        element: <Menu />,
        errorElement: <Error />,
        loader: menuLoader,
      },
      { path: '/cart', element: <Cart /> },
      {
        path: '/order/:orderId',
        loader: orderLoader,
        errorElement: <Error />,
        element: <Order />,
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: orderAction,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
