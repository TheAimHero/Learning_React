import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { removeFromCart } from './cartSlice';
import UpdateItemQuantity from './UpdateItemQuantity';

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    unitPrice: PropTypes.number.isRequired,
  }),
};

function CartItem({ item }) {
  const { name, quantity, unitPrice } = item;
  const totalPrice = quantity * unitPrice;
  const dispatch = useDispatch();

  function handleRemoveItem() {
    dispatch(removeFromCart(item.id));
  }

  return (
    <li className='py-3 sm:flex sm:items-center sm:justify-between'>
      <p className='mb-1 sm:mb-0'>
        {quantity}&times; {name}
      </p>
      <div className='flex items-center justify-between sm:gap-6'>
        <p className='text-sm font-bold'>{formatCurrency(totalPrice)}</p>
      </div>
      <UpdateItemQuantity pizzaId={item.id}></UpdateItemQuantity>
      <Button onClick={handleRemoveItem} type='small'>
        Delete
      </Button>
    </li>
  );
}

export default CartItem;
