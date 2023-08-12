import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  to: PropTypes.string,
  type: PropTypes.oneOf(['small', 'primary']),
};

export default function Button(props) {
  const { children, disabled, to, type = 'primary' } = props;

  const className = clsx(
    `semi-bold foucs:outline-none active  inline-block rounded-full bg-yellow-400 px-4 py-2 uppercase tracking-wide text-stone-800 transition-colors duration-300 
    hover:bg-yellow-300 
    focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 
    disabled:cursor-not-allowed`,
    {
      'px-4 py-2 sm:mt-2 sm:px-6 sm:py-2': type === 'primary',
      'px-4 py-2 text-xs md:px-5 md:py-2.5 ': type === 'small',
      'border-2 border-stone-300 bg-transparent hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:ring-stone-300 sm:mt-2 sm:px-6 sm:py-2': type === 'secondary',
    },
  );

  if (to) {
    return (
      <Link to={to} className={className} disabled={disabled}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} disabled={disabled}>
      {children}
    </button>
  );
}
