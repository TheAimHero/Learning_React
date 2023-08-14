import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  const cart = useSelector(state => state.cart.cart);

  const cartItemNum = cart.reduce((cartItemNum, item) => {
    return cartItemNum + item.quantity;
  }, 0);

  const cartTotalPrice = cart.reduce((cartTotalPrice, item) => {
    return cartTotalPrice + item.unitPrice * item.quantity;
  }, 0);

  return (
    <div className='flex items-center justify-between bg-stone-800 px-4 py-4 uppercase text-stone-200 sm:px-4 md:text-base'>
      <p className='space-x-4 font-semibold text-stone-300 sm:space-x-4'>
        <span>{cartItemNum} pizzas</span>
        <span>{formatCurrency(cartTotalPrice)}</span>
      </p>
      <Link to='/cart'>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
