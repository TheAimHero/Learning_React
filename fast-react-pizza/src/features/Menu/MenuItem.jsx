import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
import { addToCart } from '../Cart/cartSlice';

MenuItem.propTypes = { pizza: PropTypes.object.isRequired };

function MenuItem({ pizza }) {
  const { name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();

  function handleAddToCart() {
    dispatch(addToCart(pizza));
  }

  return (
    <li className='flex gap-4 divide-y py-2'>
      <img
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
        src={imageUrl}
        alt={name}
      />
      <div className='flex grow flex-col pt-0.5'>
        <p className='font-medium'>{name}</p>
        <p className='text-sm capitalize italic text-stone-500'>
          {ingredients.join(', ')}
        </p>
        <div className='mt-auto flex items-center justify-between'>
          {!soldOut ? (
            <p className='text-sm'>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className='text-sm font-medium uppercase text-stone-500'>
              Sold out
            </p>
          )}
          {!soldOut && (
            <Button onClick={handleAddToCart} type='small'>
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
