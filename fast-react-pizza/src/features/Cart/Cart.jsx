import { useDispatch, useSelector } from 'react-redux';

import LinkButton from '../../ui/LinkButton';
import CartItem from './CartItem';
import Button from '../../ui/Button';
import EmptyCart from './EmptyCart';
import { clearCart } from './cartSlice';

function Cart() {
  const cart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();
  const userName = useSelector(state => state.user.userName);

  const cartItems = cart.map(item => (
    <CartItem key={item.id} item={item}></CartItem>
  ));

  function handleClearCart(e) {
    dispatch(clearCart());
  }

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div>
      <LinkButton to='/menu'>&larr; Back to menu</LinkButton>
      <h2 className='mt-7 text-xl font-semibold'>Your cart, {userName}</h2>
      {cartItems.length > 0 && (
        <ul className='mt-3 divide-y divide-stone-200 border-b'>{cartItems}</ul>
      )}
      <div className='mt-6 space-x-6'>
        <Button type='primary' to='/order/new'>
          Order pizzas
        </Button>
        <Button type='secondary' onClick={handleClearCart}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
