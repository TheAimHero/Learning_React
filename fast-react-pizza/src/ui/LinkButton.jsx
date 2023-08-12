import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

LinkButton.propTypes = {
  to: PropTypes.number,
  children: PropTypes.node,
};

export default function LinkButton(props) {
  const { children, to } = props;
  const navigate = useNavigate();

  if (to === -1) {
    return (
      <button
        className="text-sm text-blue-600 hover:text-blue-900 hover:underline"
        onClick={() => navigate(-1)}
      >
        &larr; Go back
      </button>
    );
  }
  return (
    <Link
      className="text-sm text-blue-600 hover:text-blue-900 hover:underline"
      to={to}
    >
      {children}
    </Link>
  );
}
