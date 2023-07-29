import { Link } from 'react-router-dom';
import SearchOrder from '../features/Order/SearchOrder';

export default function Header() {
  return (
    <header>
      <Link to="/">Fast React Pizza Co.</Link>
      <SearchOrder />
      <p>
        Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
        cillum sint consectetur cupidatat.
      </p>
    </header>
  );
}
