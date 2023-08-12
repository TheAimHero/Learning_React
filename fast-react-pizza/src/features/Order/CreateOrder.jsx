import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = str =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

export default function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const navigation = useNavigation();
  const isSubmiting = navigation.state === 'submitting';

  const formErrors = useActionData();

  return (
    <div>
      <h2>Ready to order? Let&apos;s go!</h2>

      <Form method="POST" action="/order/new">
        <div>
          <label>First Name</label>
          <input className="input" type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" className="input" name="phone" required />
            {formErrors?.phone && <p>{formErrors.phone}</p>}
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input className="input" type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            className={`h-6 w-6 accent-yellow-400 
            focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2`}
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={e => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <Button disabled={isSubmiting}>
            {isSubmiting ? 'Placing Order...' : 'Order now'}
          </Button>
        </div>
        <input type="hidden" name="cart" value={JSON.stringify(cart)} />
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
