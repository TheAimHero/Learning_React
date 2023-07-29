import { Outlet, useNavigation } from 'react-router-dom';

import Header from './Header';
import CartOverview from '../features/Cart/CartOverview';
import Loader from './Loader';

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  console.log('isLoading:', isLoading);

  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />
      <main>
        <h1>AppLayout</h1>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}
