import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  to: PropTypes.string,
  type: PropTypes.oneOf(['small', 'primary', 'secondary', 'round']),
};

export default function Button(props) {
  const { children, onClick, disabled, to, type = 'primary' } = props;

  const className = clsx(
    `semi-bold foucs:outline-none active inline-block rounded-full px-4 py-2 uppercase tracking-wide text-stone-800 transition-colors duration-300 
    focus:outline-none focus:ring focus:ring-offset-2 
    disabled:cursor-not-allowed`,
    {
      'bg-yellow-400 hover:bg-yellow-500 focus:bg-yellow-500 focus:ring-yellow-500 sm:mt-2 sm:px-6 sm:py-2':
        type === 'primary',
      'bg-yellow-400 text-xs hover:bg-yellow-500 focus:bg-yellow-500 focus:ring-yellow-500 md:px-5 md:py-2.5':
        type === 'small',
      'border-2 border-stone-300 bg-transparent hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:ring-stone-300 sm:mt-2 sm:px-6 sm:py-2':
        type === 'secondary',
      'mx-2 flex h-8 w-8 items-center justify-between rounded-full bg-yellow-400 px-2.5 py-1.5':
        type === 'round',
    },
  );

  if (to) {
    return (
      <Link to={to} className={className} disabled={disabled}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={className} disabled={disabled}>
        {children}
      </button>
    );
  }

  return (
    <button className={className} disabled={disabled}>
      {children}
    </button>
  );
}
