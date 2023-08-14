import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../ui/Button';
import { incrementItemQuantity, decrementItemQuantity } from './cartSlice';

function UpdateItemQuantity(props) {
  const { pizzaId } = props;
  const dispatch = useDispatch();

  const quantity = useSelector(
    state => state.cart.cart.find(item => item.id === pizzaId).quantity,
  );

  function handleIncrement() {
    dispatch(incrementItemQuantity(pizzaId));
  }

  function handleDecrement() {
    dispatch(decrementItemQuantity(pizzaId));
  }

  return (
    <div className='flex flex-row items-center justify-between'>
      <Button onClick={handleDecrement} type='round'>
        -
      </Button>
      <span className='mx-2 font-semibold text-xl'>{quantity}</span>
      <Button onClick={handleIncrement} type='round'>
        +
      </Button>
    </div>
  );
}

UpdateItemQuantity.propTypes = {
  pizzaId: PropTypes.number,
};

export default UpdateItemQuantity;
