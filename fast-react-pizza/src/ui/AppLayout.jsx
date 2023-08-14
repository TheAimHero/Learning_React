import { Outlet, useNavigation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from './Header';
import CartOverview from '../features/Cart/CartOverview';
import Loader from './Loader';

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const cartItemNum = useSelector(state => state.cart.cart.length);

  return (
    <div className='grid h-screen grid-rows-[auto_1fr_auto]'>
      {isLoading && <Loader />}
      <Header />
      <div className='overflow-scroll'>
        <main className='mx-auto max-w-3xl'>
          <Outlet />
        </main>
      </div>
      {cartItemNum > 0 && <CartOverview />}
    </div>
  );
}
