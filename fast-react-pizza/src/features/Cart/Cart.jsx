import LinkButton from '../../ui/LinkButton';
// import CartItem from './CartItem';
import Button from '../../ui/Button';

function Cart() {
  // const cartItems = cart.map(item => (
  //   <CartItem key={item.key} item={item}></CartItem>
  // ));

  return (
    <div>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className="mt-7 text-xl font-semibold">Your cart, %NAME%</h2>
      {/* <ul className="mt-3 divide-y divide-stone-200 border-b">{cartItems}</ul> */}
      <div className="mt-6 space-x-2">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button type="secondary">Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
