import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { getCart } from '../Cart/cartSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = str =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

export default function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmiting = navigation.state === 'submitting';
  const userName = useSelector(state => state.user.userName);
  const cart = useSelector(getCart);

  const formErrors = useActionData();

  return (
    <div className='px-4 py-6'>
      <h2 className='mb-8 text-2xl font-semibold'>
        Ready to order? Let&apos;s go!
      </h2>

      {/* <Form method='POST' action='/order/new'> */}
      <Form method='POST'>
        <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>First Name</label>
          <div className='grow'>
            <input
              className='input w-full'
              type='text'
              defaultValue={userName}
              name='customer'
              required
            />
          </div>
        </div>

        <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Phone number</label>
          <div className='grow'>
            <input type='tel' className='input w-full' name='phone' required />
            {formErrors?.phone && (
              <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input
              className='input w-full'
              type='text'
              name='address'
              required
            />
          </div>
        </div>

        <div className='mb-12 flex flex-col items-center gap-5 sm:flex-row'>
          <input
            type='checkbox'
            className={`h-6 w-6 accent-yellow-400 
            focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2`}
            name='priority'
            id='priority'
            // value={withPriority}
            // onChange={e => setWithPriority(e.target.checked)}
          />
          <label className='font-medium' htmlFor='priority'>
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <Button disabled={isSubmiting}>
            {isSubmiting ? 'Placing Order...' : 'Order now'}
          </Button>
        </div>
        <input type='hidden' name='cart' value={JSON.stringify(cart)} />
      </Form>
    </div>
  );
}

export async function action(props) {
  const { request } = props;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    priority: data.priority === 'on' ? true : false,
    cart: JSON.parse(data.cart),
  };

  const error = {};
  if (!isValidPhone(order.phone)) {
    error.phone = 'Invalid phone number';
  }

  if (Object.keys(error).length > 0) return error;

  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
}
