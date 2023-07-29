import { useNavigate, useRouteError } from 'react-router-dom';
import { Fragment } from 'react';

function NotFound() {
  const navigate = useNavigate();
  const { error } = useRouteError();

  return (
    <Fragment>
      {error && (
        <div>
          <h1>Something went wrong 😢</h1>
          <p>{error.message}</p>
          <button onClick={() => navigate(-1)}>&larr; Go back</button>
        </div>
      )}
    </Fragment>
  );
}

export default NotFound;
